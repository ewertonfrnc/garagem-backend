import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { UsersService } from './users.service';
import { Public } from '../shared/decorators/public.decorator';
import { Role } from '../shared/enums/roles.enum';
import { Roles } from '../shared/decorators/roles.decorator';

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
}
