import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @Length(8, 20)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  readonly phone: string;
}
