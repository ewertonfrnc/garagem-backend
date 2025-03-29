import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { tryCatch } from '../shared/helpers/try-catch';

@Injectable()
export class ExerciseCategoriesService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createExerciseCategoryDto: Prisma.ExerciseCategoryCreateInput) {
    const { data, error } = await tryCatch(
      this.prisma.exerciseCategory.create({
        data: createExerciseCategoryDto,
        include: { fields: true },
      }),
    );

    if (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Failed to create exercise category',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { status: 'success', category: data };
  }

  async findAll() {
    const { data, error } = await tryCatch(
      this.prisma.exerciseCategory.findMany({
        include: { fields: true },
      }),
    );

    if (error) {
      throw new HttpException(
        { status: 'error', message: 'Failed to fetch exercise categories' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { status: 'success', results: data.length, categories: data };
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseCategory`;
  }
}
