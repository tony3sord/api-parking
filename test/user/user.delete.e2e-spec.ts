import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

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

  it('/api/user/:id(DELETE) - should create users one by one', async () => {
    const getUser = await request(app.getHttpServer())
      .get('/api/user/')
      .expect(200); // 200 get

    for (const element of getUser.body) {
      const response = await request(app.getHttpServer())
        .delete(`/api/user/${element.id}`)
        .expect(200); // 200 deleted

      if (response.status === 200) {
        expect(response.text == 'User deleted successfully');
      }
    }
  });
});
