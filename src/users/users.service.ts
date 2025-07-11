import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { UsersFilterDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  async findAllUsers(query: UsersFilterDto) {
    const { name, email } = query;

    try {
      const users = await this.prisma.user.findMany({
        where: {
          roleId: { not: { equals: 1 } },
          name: { contains: name, mode: 'insensitive' },
          email: { contains: email, mode: 'insensitive' },
        },
        omit: {
          roleId: true,
          password: true,
          passwordConfirm: true,
          passwordChangedAt: true,
          passwordResetExpires: true,
          passwordResetToken: true,
        },
        include: { roles: true },
      });

      return { status: 'success', users };
    } catch (error) {
      return { status: 'failed', message: error as Error };
    }
  }

  async findOneUser(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        omit: {
          roleId: true,
          password: true,
          passwordConfirm: true,
          passwordChangedAt: true,
          passwordResetExpires: true,
          passwordResetToken: true,
        },
        include: { roles: true },
      });

      return { status: 'success', user };
    } catch (error) {
      return { status: 'failed', message: error as Error };
    }
  }

  async createUser(userPayload: Prisma.UserCreateInput) {
    try {
      const newUser = await this.prisma.user.create({
        data: userPayload,
        include: { roles: true },
      });

      return { status: 'successs', data: newUser };
    } catch (error) {
      return { status: 'failed', message: error as Error };
    }
  }

  async updateUser(userId: number, userPayload: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: userPayload,
    });
  }
}
