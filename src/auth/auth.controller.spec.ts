import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hashSync } from 'bcrypt';

import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserEntity } from '../users/users.entity';
import { AuthController } from './auth.controller';

jest.mock('@nestjs/jwt');
jest.mock('@nestjs/config');

jest.mock('../users/users.service');

const args: CreateUserDto = {
  email: 'email@email.com',
  lastname: 'lastname',
  name: 'name',
  password: 'password',
  passwordConfirm: 'password',
};

const userMock: UserEntity = {
  id: 'eee',
  email: 'email@email.com',
  lastname: 'lastname',
  name: 'name',
  password: hashSync(args.password, 1),
};

const JwtServiceMock = JwtService as jest.Mock<JwtService>;
const ConfigServiceMock = ConfigService as jest.Mock<ConfigService>;
const UsersServiceMock = UsersService as jest.Mock<UsersService>;

describe('AuthController', () => {
  let controller: AuthController;

  const jwtServiceMock = new JwtServiceMock() as jest.Mocked<JwtService>;
  const usersServiceMock = new UsersServiceMock() as jest.Mocked<UsersService>;

  const configServiceMock =
    new ConfigServiceMock() as jest.Mocked<ConfigService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  beforeEach(() => {
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

      expect(user.user).not.toBeFalsy();
      expect(user.token).not.toBeFalsy();
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
