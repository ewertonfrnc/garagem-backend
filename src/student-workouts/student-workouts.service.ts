import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { tryCatch } from '../shared/helpers/try-catch';

@Injectable()
export class StudentWorkoutsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createStudentWorkoutDto: Prisma.StudentWorkoutCreateInput) {
    const { data, error } = await tryCatch(
      this.prisma.studentWorkout.create({
        data: createStudentWorkoutDto,
        include: {
          user: { select: { id: true, name: true, email: true } },
          workout: true,
        },
      }),
    );

    if (error) {
      throw new HttpException({ status: 'error', error: error }, 400);
    }

    return { status: 'success', studentWorkout: data };
  }

  async findAll() {
    const { data, error } = await tryCatch(
      this.prisma.studentWorkout.findMany({
        include: {
          user: { select: { id: true, name: true, email: true } },
          workout: true,
        },
      }),
    );

    if (error) {
      throw new HttpException({ status: 'error', error: error }, 400);
    }

    return { status: 'success', results: data.length, studentWorkouts: data };
  }

  findOne(id: number) {
    return `This action returns a #${id} studentWorkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentWorkout`;
  }
}
