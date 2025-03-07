import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RolesService {
  constructor(private prisma: DatabaseService) {}

  async create(createRoleDto: Prisma.RoleCreateInput): Promise<Role> {
    return await this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async findAll(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.role.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.role.delete({
      where: { id },
    });
  }
}
