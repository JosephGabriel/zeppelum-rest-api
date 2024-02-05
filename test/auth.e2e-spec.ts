import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { LoginUserDto } from '../src/users/dto/login-user.dto';

const args: CreateUserDto = {
  name: 'josé',
  lastname: 'gabriel',
  email: 'email1@email.com',
  password: 'password',
  passwordConfirm: 'password',
};

const loginArgs: LoginUserDto = {
  email: 'email1@email.com',
  password: 'password',
};

describe('Auth Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
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
        .expect(201)
        .then((res) => {
          expect(res.body.token).not.toBeFalsy();
          expect(res.body.user.name).toEqual(args.name);
        });
    });

    it('should not create user when has existing email', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(args)
        .expect(201)
        .then((res) => {
          expect(res.body.token).not.toBeFalsy();
          expect(res.body.user.name).toEqual(args.name);
        });

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(args)
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual('email in use');
        });
    });

    it("should not create user when passwords don't match", async () => {
      const input: typeof args = {
        ...args,
        passwordConfirm: 'crccrxxed',
      };

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(input)
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual('passwords must be equals');
        });
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
          expect(res.body.user.email).toBe(loginArgs.email);
          expect(res.body.token).not.toBeFalsy();
        });
    });

    it('should not login with invalid email', async () => {
      const input: typeof loginArgs = {
        email: args.email,
        password: 'ocokrcok',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send(input)
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
