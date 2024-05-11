import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
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

  readonly role: string;
}
