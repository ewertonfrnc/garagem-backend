import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { tryCatch } from '../shared/helpers/try-catch';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createWorkoutDto: Prisma.WorkoutCreateInput) {
    const { data, error } = await tryCatch(
      this.prisma.workout.create({
        data: createWorkoutDto,
      }),
    );

    if (error) {
      throw new HttpException({ status: 'error', error: error }, 400);
    }

    return { status: 'success', workout: data };
  }

  async findAll() {
    const { data, error } = await tryCatch(
      this.prisma.workout.findMany({
        include: {
          workoutExercises: {
            orderBy: { order: 'asc' },
            include: { exercise: true, sets: true },
          },
        },
      }),
    );

    if (error) {
      throw new HttpException({ status: 'error', error: error }, 400);
    }

    return { status: 'success', results: data.length, workouts: data };
  }

  findOne(id: number) {
    return `This action returns a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
