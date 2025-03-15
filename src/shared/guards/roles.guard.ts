import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '@prisma/client';
import { Reflector } from '@nestjs/core';

import { Role } from '../enums/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

type RequestWithUser = Request & { user: User };

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (requiredRoles.includes(request.user.roleId)) return true;

    throw new ForbiddenException(
      'You are not authorized to access this resource.',
    );
  }
}
