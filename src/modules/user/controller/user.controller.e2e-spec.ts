import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

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

  const createUserDto = {
    name: 'Tony',
    lastname: 'Aliaga',
    username: 'tony3sord',
    email: 'tony@gmail.com',
    phone: '+53 55964629',
    password: 'password123',
    role: 'Client',
  };

  it('/api/user (POST) - should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/user')
      .send(createUserDto);
    expect([201, 409]).toContain(response.status);

    if (response.status === 201) {
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Tony',
          lastname: 'Aliaga',
          username: 'tony3sord',
          email: 'tony@gmail.com',
          phone: '+53 55964629',
          role: 'Client',
        }),
      );
    }
  });
});
