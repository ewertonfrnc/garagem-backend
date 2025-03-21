import { Module } from '@nestjs/common';
import { ExerciseModalitiesService } from './exercise-modalities.service';
import { ExerciseModalitiesController } from './exercise-modalities.controller';

@Module({
  controllers: [ExerciseModalitiesController],
  providers: [ExerciseModalitiesService],
})
export class ExerciseModalitiesModule {}
