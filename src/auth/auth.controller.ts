import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { compare, hash } from 'bcrypt';

import { UsersService } from '../users/users.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

import { AuthPayload } from './dtos/auth-payload.dto';

import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Serialize(AuthPayload)
  @Post('signup')
  async createUser(@Body() body: CreateUserDto): Promise<AuthPayload> {
    const hasUser = await this.usersService.findOne(body.email);

    if (hasUser) {
      throw new BadRequestException('email in use');
    }

    if (body.password !== body.passwordConfirm) {
      throw new BadRequestException('passwords must be equals');
    }

    const hashedPassword = await hash(body.password, 10);

    const user = await this.usersService.create({
      email: body.email,
      name: body.name,
      lastname: body.lastname,
      password: hashedPassword,
    });

    const token = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
      },
    );

    return {
      user,
      token,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @Serialize(AuthPayload)
  async loginUser(@Body() body: LoginUserDto): Promise<AuthPayload> {
    const user = await this.usersService.findOne(body.email);

    if (!user) {
      throw new NotFoundException('email or password wrong');
    }

    const isCorrect = await compare(body.password, user.password);

    if (!isCorrect) {
      throw new UnauthorizedException('email or password wrong');
    }

    const token = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
      },
    );

    return {
      user,
      token,
    };
  }
}
