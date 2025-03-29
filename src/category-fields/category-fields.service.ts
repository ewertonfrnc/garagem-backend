import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { tryCatch } from 'src/shared/helpers/try-catch';

@Injectable()
export class CategoryFieldsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createCategoryFieldDto: Prisma.CategoryFieldsCreateManyInput) {
    const { data, error } = await tryCatch(
      this.prisma.categoryFields.createManyAndReturn({
        data: createCategoryFieldDto,
      }),
    );

    if (error) {
      throw new HttpException(
        { status: 'error', message: 'Failed to create category field' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { status: 'success', results: data.length, fields: data };
  }

  async findAll() {
    const { data, error } = await tryCatch(
      this.prisma.categoryFields.findMany(),
    );

    if (error) {
      throw new HttpException(
        { status: 'error', message: 'Failed to fetch category fields' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { status: 'success', results: data.length, fields: data };
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryField`;
  }
}
