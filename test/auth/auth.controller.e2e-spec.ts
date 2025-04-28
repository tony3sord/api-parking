import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { loginDtoTest } from './login.objects';

export const tokensByRole: Record<string, string> = {};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/auth/login (POST) - should log in and obtain token', async () => {
    await wait(3000);
    for (const user of loginDtoTest) {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ identifier: user.identifier, password: user.password })
        .expect(201); // 201 login

      if (response.status === 201) {
        expect(response.body).toEqual(
          expect.objectContaining({
            token: expect.any(String),
          }),
        );
      }
      tokensByRole[user.role] = response.body.token;
    }
  });
});
