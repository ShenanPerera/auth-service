import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}
