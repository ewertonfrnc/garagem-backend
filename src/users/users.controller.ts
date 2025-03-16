import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './users.service';
import { Role } from '../shared/enums/roles.enum';
import { Roles } from '../shared/decorators/roles.decorator';
import { Public } from '../shared/decorators/public.decorator';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  createUser(@Body() userPayload: Prisma.UserCreateInput) {
    return this.usersService.createUser(userPayload);
  }

  @Public()
  @Get()
  getUsers() {
    return this.usersService.findAllUsers();
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
