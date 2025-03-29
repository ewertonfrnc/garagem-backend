import { Module } from '@nestjs/common';
import { CategoryFieldsService } from './category-fields.service';
import { CategoryFieldsController } from './category-fields.controller';

@Module({
  controllers: [CategoryFieldsController],
  providers: [CategoryFieldsService],
})
export class CategoryFieldsModule {}
