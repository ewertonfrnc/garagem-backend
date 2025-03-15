import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../shared/decorators/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { Prisma } from '@prisma/client';

@Controller('api/users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  signup(@Body() userPayload: SignUpDto) {
    return this.authService.signUp(userPayload);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() loginDto: Prisma.UserWhereUniqueInput) {
    return this.authService.login(loginDto);
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() request) {
  //   return request.user;
  // }
}
