import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { createParkingDTOTest } from './createParking.objects';
import { tokensByRole } from '../auth/auth.controller.e2e-spec';
import { RolesEnum } from '../../src/common/enums/roles.enum';

describe('ParkingController (e2e)', () => {
  let app: INestApplication;
  let parkingId: number;

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

    parkingId = response.body.find(
      (p) => p.name === createParkingDTOTest.name,
    ).id;

    if (response.status === 200) {
      expect(response.body[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...createParkingDTOTest,
        }),
      );
    }
  });

  it('/api/parking (DELETE) - should create a parking spot', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/api/parking/${parkingId}`)
      .set('Authorization', `Bearer ${tokensByRole[RolesEnum.Admin]}`)
      .expect(200);

    if (response.status === 200) {
      expect(response.text).toEqual(
        expect.stringContaining('Parking deleted successfully'),
      );
    }
  });
});
