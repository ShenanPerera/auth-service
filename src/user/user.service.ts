import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';

export type user = any;

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {
    // mongoose.set('debug', true);
  }

  async create(): Promise<User> {
    // const createdUser = await this.userModel.create(createUserDto);
    // return createdUser;
    console.log('create new user');
    return null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return deletedUser;
  }
}
