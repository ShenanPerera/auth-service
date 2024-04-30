import { Controller, UseGuards ,Request , Post} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    // @UseGuards(LocalAuthGuard) ------> This is the guard that we are using to protect the login route-result = unauthorized
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.body);
    }
}
