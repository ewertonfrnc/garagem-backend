import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { tryCatch } from '../shared/helpers/try-catch';

@Injectable()
export class ExerciseModalitiesService {
  constructor(private prisma: DatabaseService) {}

  async create(
    createExerciseModalityDto: Prisma.ExerciseModalityCreateManyInput,
  ) {
    const result = await tryCatch(
      this.prisma.exerciseModality.createManyAndReturn({
        data: createExerciseModalityDto,
        skipDuplicates: true,
      }),
    );

    if (result.error) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return { status: 'success', data: result.data };
  }

  async findAll() {
    const result = await tryCatch(this.prisma.exerciseModality.findMany());

    if (result.error) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return {
      status: 'success',
      resulsts: result.data.length,
      modalities: result.data,
    };
  }
}
