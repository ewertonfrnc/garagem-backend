import { Controller, Get, Post, Body } from '@nestjs/common';
import { MuscleGroupsService } from './muscle-groups.service';
import { Prisma } from '@prisma/client';

@Controller('api/muscle-groups')
export class MuscleGroupsController {
  constructor(private readonly muscleGroupsService: MuscleGroupsService) {}

  @Post()
  create(@Body() createMuscleGroupDto: Prisma.MuscleGroupCreateInput) {
    return this.muscleGroupsService.create(createMuscleGroupDto);
  }

  @Get()
  findAll() {
    return this.muscleGroupsService.findAll();
  }
}
