import { IsString, IsEmail, IsNotEmpty , Length} from 'class-validator';

export class CreateUserDto {
    // @IsString()
    // @IsNotEmpty()
    readonly fullName: string;
    
    // @IsEmail()
    // @IsNotEmpty()
    readonly email: string;
    
    // @IsString()
    // @Length(8, 20)
    // @IsNotEmpty()
    readonly password: string;

    readonly role: string;
}
