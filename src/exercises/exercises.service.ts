import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { tryCatch } from '../shared/helpers/try-catch';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(exercise: Prisma.ExerciseCreateInput) {
    const newExerciseResult = await tryCatch(
      this.prisma.exercise.create({
        data: exercise,
        include: {
          muscleGroups: true,
          category: true,
          modality: true,
        },
        omit: {
          exerciseCategory: true,
          exerciseModality: true,
        },
      }),
    );

    if (newExerciseResult.error) {
      throw new HttpException(newExerciseResult.error, HttpStatus.BAD_REQUEST);
    }

    return { status: 'success', exercise: newExerciseResult.data };
  }

  async createBatch(exercises: Prisma.ExerciseCreateManyInput) {
    const { data, error } = await tryCatch(
      this.prisma.exercise.createManyAndReturn({
        data: exercises,
        skipDuplicates: true,
        include: {
          category: true,
          modality: true,
        },
      }),
    );

    if (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return {
      status: 'success',
      results: data.length,
      exercises: data,
    };
  }

  async findALl() {
    const exercisesResult = await tryCatch(
      this.prisma.exercise.findMany({
        include: {
          muscleGroups: true,
          category: true,
          modality: true,
        },
        omit: {
          exerciseCategory: true,
          exerciseModality: true,
        },
      }),
    );

    if (exercisesResult.error) {
      throw new HttpException(exercisesResult.error, HttpStatus.BAD_REQUEST);
    }

    return {
      status: 'success',
      results: exercisesResult.data.length,
      exercises: exercisesResult.data,
    };
  }
}
