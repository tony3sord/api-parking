import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { createParkingSpotDTOTest } from './create.parkingSpot.objects';
import { tokensByRole } from '../auth/auth.controller.e2e-spec';
import { RolesEnum } from '../../src/common/enums/roles.enum';
import { createParkingDTOTest } from '../parking/createParking.objects';

describe('ParkingController (e2e)', () => {
  let app: INestApplication;
  let parking;

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

  it('/api/parking (GET) - should create a parking spot', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/parking')
      .set('Authorization', `Bearer ${tokensByRole[RolesEnum.Admin]}`)
      .expect(200);

    if (response.status === 200) {
      parking = response.body.find(
        (parking) => parking.name === createParkingDTOTest.name,
      );

      expect(parking).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...createParkingDTOTest,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
    }
  });

  it('/api/parkingSpot (POST) - should create a parking spot', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/parkingSpot')
      .set('Authorization', `Bearer ${tokensByRole[RolesEnum.Client]}`)
      .send({ ...createParkingSpotDTOTest, parking: parking.id })
      .expect(201);

    if (response.status === 201) {
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          reservationDate: expect.any(String),
          reservationTime: expect.any(Number),
          reservationFinish: expect.any(String),
          vehicleDetails: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          parking: expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            ability: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
          user: expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            lastname: expect.any(String),
            email: expect.any(String),
            username: expect.any(String),
            phone: expect.any(String),
            role: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        }),
      );
    }
  });
});
