import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { StudentWorkoutsService } from './student-workouts.service';
import { Prisma } from '@prisma/client';

@Controller('api/student-workouts')
export class StudentWorkoutsController {
  constructor(
    private readonly studentWorkoutsService: StudentWorkoutsService,
  ) {}

  @Post()
  create(@Body() createStudentWorkoutDto: Prisma.StudentWorkoutCreateInput) {
    return this.studentWorkoutsService.create(createStudentWorkoutDto);
  }

  @Get()
  findAll() {
    return this.studentWorkoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentWorkoutsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentWorkoutsService.remove(+id);
  }
}
