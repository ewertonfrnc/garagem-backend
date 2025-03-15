import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from '../../shared/decorators/public.decorator';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private reflector: Reflector,
    private prisma: DatabaseService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'You are not logged in! Please log in to get access.',
      );
    }

    const jwt = await this.jwtService.verifyAsync<{
      id: string;
      iat: number;
    }>(token, { secret: this.config.get('JWT_SECRET') });

    const currentUser = await this.prisma.user.findUnique({
      where: { id: Number(jwt.id) },
      include: { roles: true },
      omit: { password: true, passwordConfirm: true },
    });

    if (!currentUser) {
      throw new UnauthorizedException(
        'The user belonging to this token does not exist.',
      );
    }

    // Check if user changed password after the jwt token was issued
    if (currentUser.passwordChangedAt) {
      const changedTimestamp = parseInt(
        String(currentUser.passwordChangedAt.getTime() / 1000),
        10,
      );

      if (jwt.iat < changedTimestamp) {
        throw new UnauthorizedException(
          'User recently changed password! Please log in again',
        );
      }
    }

    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers
    request['user'] = currentUser;
    return true;
  }
}
