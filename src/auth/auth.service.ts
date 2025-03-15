import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcryptjs';

import { DatabaseService } from '../database/database.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: DatabaseService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const SALT = 12;
    return await bcrypt.hash(password, SALT);
  }

  private signToken(userId: number): string {
    const secret = this.config.get<string>('JWT_SECRET');
    const expiresIn = this.config.get<string>('JWT_EXPIRES_IN');

    return this.jwt.sign({ id: userId }, { secret, expiresIn });
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  // private excludeSensitiveUserData(user: Prisma.UserWhereUniqueInput) {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { password, passwordConfirm, ...userData } = user;
  //   return userData;
  // }

  async signUp(userPayload: SignUpDto) {
    const { email, name, photo, password, roleId } = userPayload;
    const passwordHash = await this.hashPassword(password);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          name,
          email,
          photo,
          roleId,
          password: passwordHash,
          passwordConfirm: '',
        },
        omit: { password: true, passwordConfirm: true },
      });

      const token = this.signToken(newUser.id);

      return { status: 'success', user: newUser, token };
    } catch (error) {
      throw new HttpException(
        { status: 'fail', error: (error as Error).message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(loginAuthDto: Prisma.UserWhereUniqueInput) {
    const { email, password } = loginAuthDto;

    if (!email || !password)
      throw new HttpException(
        { status: 'fail', error: 'Please, provide email and password!' },
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    const passwordsMatch = await this.comparePassword(
      password as string,
      user!.password,
    );

    if (!user || !passwordsMatch) {
      throw new HttpException(
        { status: 'fail', error: 'Incorrect email or password' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.signToken(user.id);

    return { status: 'success', token };
  }
}
