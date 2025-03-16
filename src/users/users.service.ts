import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  async findAllUsers() {
    return await this.prisma.user.findMany({
      omit: { password: true, passwordConfirm: true },
      include: { roles: true },
    });
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
