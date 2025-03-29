import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoryFieldsService } from './category-fields.service';
import { Prisma } from '@prisma/client';

@Controller('api/category-fields')
export class CategoryFieldsController {
  constructor(private readonly categoryFieldsService: CategoryFieldsService) {}

  @Post()
  create(@Body() createCategoryFieldDto: Prisma.CategoryFieldsCreateManyInput) {
    return this.categoryFieldsService.create(createCategoryFieldDto);
  }

  @Get()
  findAll() {
    return this.categoryFieldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryFieldsService.findOne(+id);
  }
}
