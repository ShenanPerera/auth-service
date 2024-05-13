/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from './dto/create-user.dto';
import { Headers } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  // This route is called when the user logs in with Google
  @Get()
  async UserByAccessToken(@Body() accessToken: string) {
    if (!accessToken) {
      throw new HttpException('Access token is required', 400);
    }

    const userInfoUrl = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;
    const response = await this.httpService.get(userInfoUrl).toPromise();
    const userData = response.data;
    return userData.email;
  }

  // This route is called when the user logs in with Google for the first time(new user)
  @Patch('updateNewUser')
  async newUserUpdate(
    @Headers('access_token') accessToken: string,
    @Body() userDto: CreateUserDto,
  ): Promise<any> {
    try {
      const email = await this.UserByAccessToken(accessToken);

      const userExists = await this.userService.findOne(email);
      if (userExists) {
        return this.userService.newUserUpdate(userExists.email, userDto);
      }

      return userExists;
    } catch (error) {
      throw new HttpException('Failed to update user', 500);
    }
  }

  // This route is called when admin needs to get all users
  @Get('/getAllUsers')
  async findAll(@Headers('access_token') accessToken: string): Promise<any> {
    const email = await this.UserByAccessToken(accessToken);
    const user = await this.userService.findOne(email);

    if (user.role !== 'ADMIN') {
      throw new HttpException('Unauthorized', 401);
    }
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch users', 500);
    }
  }

  // This route is called when user needs to get his/her details
  @Get('currentUser')
  async findOne(@Headers('access_token') accessToken: string): Promise<any> {
    const email = await this.UserByAccessToken(accessToken);
    try {
      return this.userService.findOne(email);
    } catch (error) {
      throw new HttpException('Failed to fetch user', 500);
    }
  }

  // This route is called when user needs to update his/her details
  @Patch('updateUser')
  async update(
    @Headers('access_token') accessToken: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const email = await this.UserByAccessToken(accessToken);
    try {
      return this.userService.update(email, updateUserDto);
    } catch (error) {
      throw new HttpException('Failed to update user', 500);
    }
  }

  // This route is called when user needs to delete his/her account
  @Delete('deleteUser')
  async remove(@Headers('access_token') accessToken: string): Promise<any> {
    const email = await this.UserByAccessToken(accessToken);
    const user = await this.userService.findOne(email);
    const id = user._id;
    try {
      return this.userService.remove(id);
    } catch (error) {
      throw new HttpException('Failed to delete user', 500);
    }
  }
}
