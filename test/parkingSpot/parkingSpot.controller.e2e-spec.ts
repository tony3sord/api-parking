import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { createParkingSpotDTOTest } from './create.parkingSpot.objects';
import { tokensByRole } from '../auth/auth.controller.e2e-spec';
import { RolesEnum } from '../../src/common/enums/roles.enum';

describe('ParkingController (e2e)', () => {
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

  it('/api/parkingSpot (POST) - should create a parking spot', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/parkingSpot')
      .set('Authorization', `Bearer ${tokensByRole[RolesEnum.Client]}`)
      .send(createParkingSpotDTOTest)
      .expect([201, 409]); // 201: Created, 409: Conflict if parking spot already taken

    if (response.status === 201) {
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...createParkingSpotDTOTest,
        }),
      );
    }
  });

  it('/api/parking/logs (GET) - should retrieve parking logs', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/parking/logs')
      .set('Authorization', `Bearer ${tokensByRole[RolesEnum.Admin]}`)
      .expect(200); // 200: OK

    response.body.forEach((parkingLog) => {
      expect(parkingLog).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          vehicleDetails: expect.any(String),
          reservationDate: expect.any(String),
          reservationTime: expect.any(Number),
          reservationFinish: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
    });
  });
});
