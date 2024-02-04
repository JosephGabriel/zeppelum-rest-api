import { NotFoundException, Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventsService } from './events.service';

import { EventEntity } from './events.entity';

const eventMockRepo = {
  create: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
} as unknown as jest.Mocked<Repository<EventEntity>>;

const eventMock: EventEntity = {
  id: 'sde',
  createdAt: new Date(),
  updatedAt: new Date(),
  dateStart: new Date(),
  description: 'lorem ipsum',
  endDate: new Date(),
  image: 'http://image.com',
  price: 99,
  rating: 0,
  shortDescription: 'lorem ipsum',
  title: 'Awesome Event',
  type: 'ONLINE',
};

describe('EventsService', () => {
  let service: EventsService;

  beforeAll(async () => {
    const TypeormRepository: Provider = {
      provide: getRepositoryToken(EventEntity),
      useValue: eventMockRepo,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService, TypeormRepository],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should find one event', async () => {
      eventMockRepo.findOne.mockReturnValue(Promise.resolve(eventMock));

      const event = await service.findOne('dcr');

      expect(event).not.toBeFalsy();
    });

    it('should throw an error when does not found event', async () => {
      eventMockRepo.findOne.mockReturnValue(null);

      try {
        await service.findOne('dcr');
      } catch (error) {
        expect(error.message).toBe('no event found');
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      eventMockRepo.findOne.mockReturnValue(Promise.resolve(eventMock));

      eventMockRepo.delete.mockReturnValue(
        Promise.resolve({ raw: eventMock, affected: 1 }),
      );

      const result = await service.deleteEvent('dcr');

      expect(result.raw).not.toBeFalsy();
      expect(result.affected).toBe(1);
    });

    it('should throw an error when tries to delete invalid event', async () => {
      eventMockRepo.findOne.mockReturnValue(null);

      try {
        await service.deleteEvent('dcr');
      } catch (error) {
        expect(error.message).toBe('no event found');
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  // TODO implement test
  // it('should filter event query', async () => {
  //   eventMockRepo.find.mockReturnValue(new Array(4).fill(eventMock));

  //   try {
  //     await service.findAll();
  //   } catch (error) {
  //     expect(error.message).toBe('no event found');
  //     expect(error).toBeInstanceOf(NotFoundException);
  //   }
  // });
});
