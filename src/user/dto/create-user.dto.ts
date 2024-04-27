import { IsString, IsEmail, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly fullName: string;
    
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
