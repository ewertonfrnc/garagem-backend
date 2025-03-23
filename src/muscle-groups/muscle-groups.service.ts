import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { tryCatch } from '../shared/helpers/try-catch';

@Injectable()
export class MuscleGroupsService {
  constructor(private prisma: DatabaseService) {}

  async create(createMuscleGroupDto: Prisma.MuscleGroupCreateInput) {
    const result = await tryCatch(
      this.prisma.muscleGroup.create({ data: createMuscleGroupDto }),
    );

    if (result.error) {
      throw new HttpException({ status: 'error', error: result.error }, 400);
    }

    return { status: 'success', exercise: result.data };
  }

  async findAll() {
    const result = await tryCatch(this.prisma.muscleGroup.findMany());

    if (result.error) {
      throw new HttpException({ status: 'error', error: result.error }, 400);
    }

    return {
      status: 'success',
      result: result.data.length,
      muscleGroups: result.data,
    };
  }
}
