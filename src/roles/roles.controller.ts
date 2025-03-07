import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Prisma } from '@prisma/client';
import { Public } from '../shared/decorators/public.decorator';

@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Public()
  @Post()
  create(@Body() createRoleDto: Prisma.RoleCreateInput) {
    return this.rolesService.create(createRoleDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
