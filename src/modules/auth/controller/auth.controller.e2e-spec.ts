import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { loginDtoTest } from '../../../../test/auth/login.objects';

export const tokensByRole: Record<string, string> = {};

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

  it('/api/auth/login (POST)', async () => {
    for (const user of loginDtoTest) {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ identifier: user.identifier, password: user.password })
        .expect(201); //201 login

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
