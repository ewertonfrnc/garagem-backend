import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StudentWorkoutsService } from './student-workouts.service';
import { Prisma } from '@prisma/client';
import { QueryDTO } from './dto';

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
  findAll(@Query() queryDto: QueryDTO) {
    return this.studentWorkoutsService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentWorkoutsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentWorkoutsService.remove(id);
  }
}
