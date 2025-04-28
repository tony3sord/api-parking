import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { createParkingDTOTest } from '../../../../test/parking/create.parking.objects';
import { tokensByRole } from '../../auth/controller/auth.controller.e2e-spec';
import { RolesEnum } from '../../../common/enums/roles.enum';

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

  it('/api/parking (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/parking')
      .set('Authorization', `Bearer ${tokensByRole[RolesEnum.Client]}`)
      .send(createParkingDTOTest)
      // 201: Created
      // 409: Conflict (the parking request cannot be completed because there is already a car in the parking spot)
      // 401 if not authorized
      .expect([201, 409]);

    if (response.status === 201) {
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...createParkingDTOTest,
        }),
      );
    }
  });
  it('/api/parking (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/parking')
      .set('Authorization', `Bearer ${tokensByRole[RolesEnum.Worker]}`)
      .expect(200);

    const booleanValue = response.text === 'false' ? false : true;
    expect(typeof booleanValue).toBe('boolean');
    expect(booleanValue).toBe([false, true].includes(booleanValue));
  });
});
