import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExerciseModalitiesService } from './exercise-modalities.service';
import { Prisma } from '@prisma/client';

@Controller('api/exercise-modalities')
export class ExerciseModalitiesController {
  constructor(
    private readonly exerciseModalitiesService: ExerciseModalitiesService,
  ) {}

  @Post()
  create(
    @Body() createExerciseModalityDto: Prisma.ExerciseModalityCreateInput,
  ) {
    return this.exerciseModalitiesService.create(createExerciseModalityDto);
  }

  @Get()
  findAll() {
    return this.exerciseModalitiesService.findAll();
  }
}
