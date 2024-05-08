import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @UseGuards(LocalAuthGuard) ------> This is the guard that we are using to protect the login route-result = unauthorized
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  //OAUth2.0
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin() {
    return { msg: 'This route is protected by Google OAuth2.0' };
  }

  @Get('google/redirect')
  handleRedirect() {
    return { msg: 'OK, you are redirected to the google login page.' };
  }
}
