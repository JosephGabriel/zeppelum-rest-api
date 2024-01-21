import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';

import { EventsService } from './events.service';

jest.mock('./events.service');

const EventsServiceMock = EventsService as jest.Mock<EventsService>;

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
});
