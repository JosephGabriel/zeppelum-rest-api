import { Test, TestingModule } from '@nestjs/testing';

import { EventsController } from './events.controller';

import { EventsService } from './events.service';
import { EventEntity } from './events.entity';

jest.mock('./events.service');

const EventsServiceMock = EventsService as jest.Mock<EventsService>;

export const eventMock: EventEntity = {
  id: '1',
  image: 'example.jpg',
  title: 'Exemplo de Evento',
  description: 'Descrição do evento de exemplo',
  rating: 4.5,
  price: 20.0,
  shortDescription: 'lorem ipsum',
  type: 'ONLINE',
  dateStart: new Date('2024-02-01T00:00:00.000Z'),
  endDate: new Date('2024-02-02T00:00:00.000Z'),
  createdAt: new Date('2024-02-01T12:30:45.000Z'),
  updatedAt: new Date('2024-02-01T12:30:45.000Z'),
};

describe('EventsController', () => {
  let controller: EventsController;

  const eventsServiceMock =
    new EventsServiceMock() as jest.Mocked<EventsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: eventsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should delete an event', () => {
  //   eventsServiceMock.deleteEvent.mockReturnValue(new Promise(eventMock));
  // });
});
