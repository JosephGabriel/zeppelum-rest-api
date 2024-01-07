import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

const args = {
  name: 'josé',
  lastname: 'gabriel',
  email: 'email1@email.com',
  password: 'password',
  passwordConfirm: 'password',
};

const loginArgs = {
  name: 'josé',
  lastname: 'gabriel',
  email: 'email1@email.com',
  password: 'password',
  passwordConfirm: 'password',
};

describe('Auth Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth/signup (POST)', () => {
    it('should create a valid user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(args)
        .expect(201);
    });
  });

  describe('/auth/signin (POST)', () => {
    it('should login', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(args)
        .expect(201);

      return request(app.getHttpServer())
        .post('/auth/signin')
        .send(loginArgs)
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe(loginArgs.email);
        });
    });

    it('should not login with invalid email', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: args.email, password: 'ocokrcok' })
        .expect(404);

      expect(response.body.message).toBe('email or password wrong');
    });

    it('should not login with wrong credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(args)
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: args.email, password: 'ocokrcok' })
        .expect(401);

      expect(response.body.message).toBe('email or password wrong');
    });
  });
});
