import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ExerciseCategoriesService } from './exercise-categories.service';
import { Prisma } from '@prisma/client';

@Controller('api/exercise-categories')
export class ExerciseCategoriesController {
  constructor(
    private readonly exerciseCategoriesService: ExerciseCategoriesService,
  ) {}

  @Post()
  create(
    @Body() createExerciseCategoryDto: Prisma.ExerciseCategoryCreateInput,
  ) {
    return this.exerciseCategoriesService.create(createExerciseCategoryDto);
  }

  @Get()
  findAll() {
    return this.exerciseCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseCategoriesService.findOne(+id);
  }
}
