import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './users.service';
import { Role } from '../shared/enums/roles.enum';
import { Roles } from '../shared/decorators/roles.decorator';
import { UsersFilterDto } from './dto/users.dto';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() userPayload: Prisma.UserCreateInput) {
    return this.usersService.createUser(userPayload);
  }

  @Get()
  getUsers(@Query() query: UsersFilterDto) {
    return this.usersService.findAllUsers(query);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.findOneUser(userId);
  }

  @Roles(Role.User)
  @Get('me')
  getMe(@Req() req: Request & { user: User }) {
    return req.user;
  }

  @Patch(':id')
  @Roles(Role.User)
  @UseInterceptors(FileInterceptor('photo', { dest: 'uploads/images/users' }))
  updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() userPayload: Prisma.UserUpdateInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log({ file });
    return this.usersService.updateUser(userId, {
      ...userPayload,
      photo: file.filename,
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('files', { dest: 'uploads/images/users' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
