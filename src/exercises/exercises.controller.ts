import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/roles.enum';
import { Prisma } from '@prisma/client';

@Controller('/api/exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.exercisesService.findALl();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      status: 'success',
      data: `This action returns a #${id} exercise`,
    };
  }

  @Post()
  @Roles(Role.Admin)
  create(@Body() createExerciseDto: Prisma.ExerciseCreateInput) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return {
      status: 'success',
      data: `This action update a #${id} exercise`,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      status: 'success',
      data: `This action remove a #${id} exercise`,
    };
  }
}
