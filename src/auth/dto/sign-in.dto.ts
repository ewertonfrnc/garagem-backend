import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../shared/enums/roles.enum';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;

  @IsArray()
  @IsOptional()
  roles: Role[];
}
