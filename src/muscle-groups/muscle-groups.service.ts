import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { tryCatch } from '../shared/helpers/try-catch';

@Injectable()
export class MuscleGroupsService {
  constructor(private prisma: DatabaseService) {}

  async create(createMuscleGroupDto: Prisma.BodyPartCreateInput) {
    const result = await tryCatch(
      this.prisma.bodyPart.create({ data: createMuscleGroupDto }),
    );

    if (result.error) {
      throw new HttpException({ status: 'error', error: result.error }, 400);
    }

    return { status: 'success', data: result.data };
  }

  async findAll() {
    const result = await tryCatch(this.prisma.bodyPart.findMany());

    if (result.error) {
      throw new HttpException({ status: 'error', error: result.error }, 400);
    }

    return { status: 'success', result: result.data.length, data: result.data };
  }
}
