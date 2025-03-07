import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const user = this.usersService.findOne(signInDto.name);

    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.userId, username: user.username };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
