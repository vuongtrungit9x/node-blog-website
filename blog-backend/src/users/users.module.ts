import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // import your User entity
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // add this line
  controllers: [UsersController],
  providers: [UsersService], // add UsersService to providers
})
export class UsersModule {}
