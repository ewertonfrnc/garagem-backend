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
import { createExerciseDto } from './dto';
import { ExercisesService } from './exercises.service';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/roles.enum';

@Controller('/api/exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Roles(Role.Admin)
  @Get()
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
  create(@Body() createExerciseDto: createExerciseDto) {
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
