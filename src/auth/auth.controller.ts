/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Controller, Headers, HttpException, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // This route is called when the user logs in with Google
  @Post('login')
  async login(@Headers('access_token') accessToken: string): Promise<any> {
    if (!accessToken) {
      throw new HttpException('Access token is required', 400);
    }
    const userInfoUrl = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;

    try {
      const response = await this.httpService.get(userInfoUrl).toPromise();
      const userData = response.data;

      const userExists = await this.userService.findOne(userData.email);
      if (userExists) {
        const payload = {
          sub: userExists.fullName,
          role: userExists.role,
        };
        return {
          success: false,
          token: await this.jwtService.signAsync(payload),
        };
      }
      try {
        const response = await this.userService.create(userData);

        if (response) {
          return { success: true };
        }
      } catch (error) {
        throw new HttpException('Failed to create user', 500);
      }

      return { success: true };
    } catch (error) {
      throw new HttpException('Failed to get user info', 500);
    }
  }
}
