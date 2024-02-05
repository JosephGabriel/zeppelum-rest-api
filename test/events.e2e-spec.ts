import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { CreateEventDto } from '../src/events/dto/create-events.dto';

const createEventArgs: CreateEventDto = {
  title: 'Kihn, Lakin and King',
  description:
    'Officia maiores qui ut minus rem sit iste consectetur possimus. Aut est quibusdam qui labore aut. Corrupti sed commodi quaerat. Asperiores sapiente provident error asperiores ullam.',
  price: 379.49,
  type: 'ONLINE',
  dateStart: new Date(
    'Sun Feb 04 2024 04:10:12 GMT-0300 (Horário Padrão de Brasília)',
  ),
  endDate: new Date(
    'Fri Sep 13 2024 02:33:02 GMT-0300 (Horário Padrão de Brasília)',
  ),
  image: 'https://loremflickr.com/640/480?lock=7704681790832640',
  shortDescription:
    'Officia maiores qui ut minus rem sit iste consectetur possimus. Aut est quibusdam qui labore aut. Corrupti sed commodi quaerat. Asperiores sapiente provident error asperiores ullam.',
};

describe('Events Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/events (POST)', () => {
    it('should create a valid event', () => {
      return request(app.getHttpServer())
        .post('/events')
        .send(createEventArgs)
        .expect(201);
    });
  });
});
