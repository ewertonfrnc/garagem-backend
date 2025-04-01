import { Module } from '@nestjs/common';
import { StudentWorkoutsService } from './student-workouts.service';
import { StudentWorkoutsController } from './student-workouts.controller';

@Module({
  controllers: [StudentWorkoutsController],
  providers: [StudentWorkoutsService],
})
export class StudentWorkoutsModule {}
