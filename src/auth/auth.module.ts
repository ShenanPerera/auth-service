import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule, UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
