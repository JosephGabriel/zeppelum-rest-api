import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  Provider,
  UnauthorizedException,
} from '@nestjs/common';
import { hashSync } from 'bcrypt';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

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

describe('UsersController', () => {
  let controller: UsersController;

  const usersServiceMock = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const usersService: Provider = {
      provide: UsersService,
      useValue: usersServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersService],
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
      usersServiceMock.create.mockReturnValue(userMock);

      const user = await controller.createUser(args);

      expect(user).not.toBeFalsy();
    });

    it('should throw error when tries to user existing email', async () => {
      usersServiceMock.findOne.mockReturnValue(userMock);

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
      usersServiceMock.findOne.mockReturnValue(userMock);

      const user = await controller.loginUser({
        email: userMock.email,
        password: args.password,
      });

      expect(user).not.toBeFalsy();
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
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should throw error when passwords dont match', async () => {
      usersServiceMock.findOne.mockReturnValue(userMock);

      try {
        await controller.loginUser({
          email: userMock.email,
          password: 'cdccr',
        });
      } catch (error) {
        expect(error.message).toBe('email or password wrong');
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
