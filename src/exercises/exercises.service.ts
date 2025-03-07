import { Injectable } from '@nestjs/common';
import { Exercise } from './interfaces';

@Injectable()
export class ExercisesService {
  private readonly exercises: Exercise[] = [];

  findALl() {
    return {
      status: 'success',
      data: this.exercises,
    };
  }

  create(exercise: Exercise) {
    this.exercises.push(exercise);
    return {
      status: 'success',
      data: exercise,
    };
  }
}
