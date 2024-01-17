import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Provider } from '@nestjs/common';

import { hashSync } from 'bcrypt';

import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

const userInstance: UserEntity = {
  id: '1',
  email: 'email@email.com',
  name: 'John',
  lastname: 'Doe',
  password: hashSync('password', 1),
};

describe('UsersService', () => {
  let service: UsersService;

  const userMockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const TypeormRepository: Provider = {
      provide: getRepositoryToken(UserEntity),
      useValue: userMockRepository,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, TypeormRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a valid user', async () => {
      userMockRepository.findOne.mockReturnValue(userInstance);

      const user = await service.findOne(userInstance.email);

      expect(user).not.toBeFalsy();
      expect(userMockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a valid user', async () => {
      userMockRepository.create.mockReturnValue(userInstance);
      userMockRepository.save.mockReturnValue(userInstance);

      const user = await service.create(userInstance);

      expect(user).not.toBeFalsy();
      expect(userMockRepository.create).toHaveBeenCalledTimes(1);
      expect(userMockRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
