import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService:UserService,
        private jwtService:JwtService
    ){}

    async validateUser(email:string, password:string):Promise<any>{
        const user = await this.usersService.findOne(email);
        if(user && user.password === password){
            const {password, ...result} = user;
            return result;
        }

        return null;
        
    }

    async login(user:any){
        const payload = {sub:user.email , role:user.role};
        return{
            access_token:this.jwtService.sign(payload),
        }
    }
}
