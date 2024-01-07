import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';

import { compare, hash } from 'bcrypt';

import { UsersService } from './users.service';

import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body(new ValidationPipe()) body: CreateUserDto) {
    const hasUser = await this.usersService.findOne(body.email);

    if (hasUser) {
      throw new BadRequestException('email in use');
    }

    if (body.password !== body.passwordConfirm) {
      throw new BadRequestException('passwords must be equals');
    }

    const hashedPassword = await hash(body.password, 10);

    const args: CreateUserDto = { ...body, password: hashedPassword };

    delete args.passwordConfirm;

    const user = await this.usersService.create(args);

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async loginUser(@Body() body: LoginUserDto) {
    const user = await this.usersService.findOne(body.email);

    if (!user) {
      throw new NotFoundException('email or password wrong');
    }

    const isCorrect = await compare(body.password, user.password);

    if (!isCorrect) {
      throw new UnauthorizedException('email or password wrong');
    }

    return user;
  }
}
