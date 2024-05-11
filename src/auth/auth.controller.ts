/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Controller, Headers, Post } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/user/user.service';
@Controller('auth')
export class AuthController {
  // constructor(private readonly userService: UserService) {}

  // @Post('login')
  // login(@Headers('access_token') accessToken: string): string {
  //   const access_token = accessToken;
  //   return access_token;
  // }

  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Headers('access_token') accessToken: string): Promise<any> {
    const userInfoUrl = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;

    // console.log(userInfoUrl);
    // const user =  this.httpService
    //   .get(userInfoUrl)
    //   .pipe(map((response) => response.data));
    //   console.log(user);
    // return user;

    try {
      const response = await this.httpService.get(userInfoUrl).toPromise();
      const userData = response.data;

      const userExists = await this.userService.findOne(userData.emailk);
      if (!userExists) {
        await this.userService.create();
      }

      // Process user data here
      console.log('User Data:', userData);
      // const createUserUrl = `http://localhost:3000/api/user/{userData}}`;
      // const newUserResponse = await this.userService.create(createUserUrl).toPromise();

      // Optionally, you can return a response to the client indicating success
      return { success: true };
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Optionally, you can return an error response to the client
      return { success: false, error: 'Failed to fetch user data' };
    }
  }
}
