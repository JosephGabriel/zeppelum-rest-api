import {
  BadRequestException,
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { hash } from 'bcrypt';

import { UsersService } from './users.service';

import { CreateUserDto } from './dtos/create-user.dto';

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
}
