import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { createUserDtoTest } from '../user/create.user.objects';

describe('UserController (e2e)', () => {
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

  it('/api/user (POST) - should create users one by one', async () => {
    for (const user of createUserDtoTest) {
      const response = await request(app.getHttpServer())
        .post('/api/user')
        .send(user)
        .expect([201, 409]); // 201 created, 409 conflict if user already exists

      if (response.status === 201) {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
          }),
        );
      }
    }
  });
});
