import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { tryCatch } from '../shared/helpers/try-catch';
import { QueryDTO } from './dto';

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

  async findAll(queryDto: QueryDTO) {
    const { userId } = queryDto;

    const { data, error } = await tryCatch(
      this.prisma.studentWorkout.findMany({
        where: { userId: Number(userId) },
        include: {
          workout: {
            include: {
              // exercises: true,
            },
          },
        },
        omit: { userId: true, workoutId: true },
      }),
    );

    if (error) {
      throw new HttpException({ status: 'error', error: error }, 400);
    }

    return { status: 'success', results: data.length, studentWorkouts: data };
  }

  async findOne(id: number) {
    const { data, error } = await tryCatch(
      this.prisma.studentWorkout.findMany({
        where: { userId: id },
        include: {
          user: { select: { id: true, name: true, email: true } },
          workout: true,
        },
        omit: { userId: true, workoutId: true },
      }),
    );

    if (error) {
      throw new HttpException({ status: 'error', error: error }, 400);
    }

    return { status: 'success', studentWorkout: data };
  }

  remove(id: number) {
    return `This action removes a #${id} studentWorkout`;
  }
}
