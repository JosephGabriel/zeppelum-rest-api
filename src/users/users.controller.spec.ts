import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hashSync } from 'bcrypt';

import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

jest.mock('@nestjs/jwt');
jest.mock('@nestjs/config');

jest.mock('./users.service');

const args = {
  email: 'email@email.com',
  lastname: 'lastname',
  name: 'name',
  password: 'password',
  passwordConfirm: 'password',
};

const userMock = {
  id: 'eee',
  email: 'email@email.com',
  lastname: 'lastname',
  name: 'name',
  password: hashSync(args.password, 1),
};

const JwtServiceMock = JwtService as jest.Mock<JwtService>;
const ConfigServiceMock = ConfigService as jest.Mock<ConfigService>;
const UsersServiceMock = UsersService as jest.Mock<UsersService>;

describe('UsersController', () => {
  let controller: UsersController;

  const jwtServiceMock = new JwtServiceMock() as jest.Mocked<JwtService>;
  const configServiceMock =
    new ConfigServiceMock() as jest.Mocked<ConfigService>;
  const usersServiceMock = new UsersServiceMock() as jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/signup', () => {
    it('should create a user', async () => {
      usersServiceMock.findOne.mockReturnValue(null);
      usersServiceMock.create.mockReturnValue(Promise.resolve(userMock));

      const user = await controller.createUser(args);

      expect(user).not.toBeFalsy();
    });

    it('should throw error when tries to user existing email', async () => {
      usersServiceMock.findOne.mockReturnValue(Promise.resolve(userMock));

      await expect(controller.createUser(args)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error when passwords dont match', async () => {
      const newArgs: CreateUserDto = { ...args, passwordConfirm: 'kcmkrmcrcm' };

      try {
        await controller.createUser(newArgs);
      } catch (error) {
        expect(error.message).toBe('passwords must be equals');
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('/signin', () => {
    it('should login a user', async () => {
      usersServiceMock.findOne.mockReturnValue(Promise.resolve(userMock));

      configServiceMock.get.mockReturnValue('mock');

      jwtServiceMock.signAsync.mockReturnValue(Promise.resolve('kmkmk'));

      const user = await controller.loginUser({
        email: userMock.email,
        password: args.password,
      });

      expect(user.user).not.toBeFalsy();
      expect(user.token).not.toBeFalsy();
    });

    it('should throw error when tries to login with wrong email', async () => {
      usersServiceMock.findOne.mockReturnValue(null);

      try {
        await controller.loginUser({
          email: userMock.email,
          password: userMock.password,
        });
      } catch (error) {
        expect(error.message).toBe('email or password wrong');
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw error when passwords dont match', async () => {
      usersServiceMock.findOne.mockReturnValue(Promise.resolve(userMock));

      try {
        await controller.loginUser({
          email: userMock.email,
          password: 'cdccr',
        });
      } catch (error) {
        expect(error.message).toBe('email or password wrong');
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
