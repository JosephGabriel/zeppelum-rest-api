import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('Auth Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth', () => {
    it('/signup (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name: 'josé',
          lastname: 'gabriel',
          email: 'email1@email.com',
          password: 'password',
          passwordConfirm: 'password',
        })
        .expect(201);
    });
  });
});
