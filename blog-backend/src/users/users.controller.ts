import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard, Public } from '../auth/auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  login(@Body() signInDto: UserLoginDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // Hash the password using bcrypt with increased salt rounds
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    //TODO: validate user email & password & check existed username
    const user = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password_hash = hashedPassword;

    const createdUser = await this.usersService.create(user);
    // Omit the password_hash property from the response
    const responseUser = omit(createdUser, 'password_hash');

    return this.usersService.create(responseUser);
  }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<void> {
    return this.usersService.delete(Number(id));
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
