import { Module } from '@nestjs/common';
import { ExerciseCategoriesService } from './exercise-categories.service';
import { ExerciseCategoriesController } from './exercise-categories.controller';

@Module({
  controllers: [ExerciseCategoriesController],
  providers: [ExerciseCategoriesService],
})
export class ExerciseCategoriesModule {}
