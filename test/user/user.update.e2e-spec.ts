import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { RolesEnum } from '../../src/common/enums/roles.enum';
import { tokensByRole } from '../auth/auth.controller.e2e-spec';

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

  it('/api/user/:id(PATCH) - should create users one by one', async () => {
    const getUser = await request(app.getHttpServer())
      .get('/api/user')
      .set('Authorization', `Bearer ${tokensByRole[RolesEnum.Admin]}`)
      .send()
      .expect(200); // 200 updated

    const response = await request(app.getHttpServer())
      .patch(`/api/user/${getUser.body[0].id}`)
      .set('Authorization', `Bearer ${tokensByRole[RolesEnum.Admin]}`)
      .send({ name: 'Testname', lastname: 'Testlastname' })
      .expect(200); // 200 updated

    if (response.status === 201) {
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: getUser.body[0].name,
          lastname: getUser.body[0].lastname,
          username: getUser.body[0].username,
          email: getUser.body[0].email,
          phone: getUser.body[0].phone,
          role: getUser.body[0].role,
        }),
      );
    }
  });
});
