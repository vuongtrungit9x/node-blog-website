import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // import your User entity
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // add this line
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService], // add UsersService to providers
  exports: [UsersService],
})
export class UsersModule {}
