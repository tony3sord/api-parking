import { EntityManager } from 'typeorm';
import { ParkingSpot } from '../entities/parkingSpot.entity';
import { CreateParkingSpotDto } from '../dto';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/user/entities/user.entity';
import { Parking } from 'src/modules/parking/entities/parking.entity';
dotenv.config();

@Injectable()
export class ParkingSpotRepository {
  constructor(
    @InjectEntityManager(process.env.POSTGRES_DB_CONNECTION_NAME)
    private readonly dataSource: EntityManager,
  ) {}

  async reqParkCar(
    createParkingSpotDto: CreateParkingSpotDto,
    user: User,
    parking: Parking,
  ) {
    const parkRepository = this.dataSource.getRepository(ParkingSpot);

    const reservationDateObj = new Date(createParkingSpotDto.reservationDate);

    const reservationFinishObj = new Date(
      reservationDateObj.getTime() +
        createParkingSpotDto.reservationTime * 1000,
    );

    const reservationFinishUTC = reservationFinishObj.toISOString();

    const park = {
      ...createParkingSpotDto,
      reservationFinish: reservationFinishUTC,
      user: user,
      parking,
    };

    const newReqParking = parkRepository.create(park);
    return await parkRepository.save(newReqParking);
  }

  async getStateParkingForReservationDate(
    createParkingSpotDto: CreateParkingSpotDto,
  ): Promise<number> {
    const parkRepository = this.dataSource.getRepository(ParkingSpot);
    const { reservationDate, reservationTime } = createParkingSpotDto;
    const reservationDateObj = new Date(reservationDate);

    const reservationFinish = new Date(
      reservationDateObj.getTime() + reservationTime * 1000,
    );

    const overlappingReservations = await parkRepository
      .createQueryBuilder('parking')
      .where(
        'parking.reservationDate < :reservationFinish AND parking.reservationFinish > :reservationDate',
        { reservationDate: reservationDateObj, reservationFinish },
      )
      .getCount();

    return overlappingReservations;
  }

  async getStateNow(): Promise<boolean> {
    const parkRepository = this.dataSource.getRepository(ParkingSpot);

    const now = new Date();

    const state = await parkRepository
      .createQueryBuilder('parking')
      .where(
        'parking.reservationDate <= :now AND parking.reservationFinish >= :now',
        { now },
      )
      .getCount();

    return state > 0;
  }

  async getLogsForAdmin(): Promise<ParkingSpot[]> {
    const parkRepository = this.dataSource.getRepository(ParkingSpot);

    const logs = await parkRepository.createQueryBuilder('parking').getMany();

    return logs;
  }
}
