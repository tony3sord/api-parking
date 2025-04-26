import { EntityManager } from 'typeorm';
import { Parking } from '../entities/parking.entity';
import { CreateParkingDto } from '../dto';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ParkingRepository {
  constructor(
    @InjectEntityManager(process.env.POSTGRES_DB_CONNECTION_NAME)
    private readonly dataSource: EntityManager,
  ) {}

  async reqParkCar(createParkingDto: CreateParkingDto) {
    const parkRepository = this.dataSource.getRepository(Parking);

    const reservationDateObj = new Date(createParkingDto.reservationDate);

    const reservationFinishObj = new Date(
      reservationDateObj.getTime() + createParkingDto.reservationTime * 1000,
    );

    const reservationFinishUTC = reservationFinishObj.toISOString();

    const park = {
      ...createParkingDto,
      reservationFinish: reservationFinishUTC,
    };

    const newReqParking = parkRepository.create(park);
    return await parkRepository.save(newReqParking);
  }

  async getStateParkingForReservationDate(
    createParkingDto: CreateParkingDto,
  ): Promise<boolean> {
    const parkRepository = this.dataSource.getRepository(Parking);
    const { reservationDate, reservationTime } = createParkingDto;
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

    return overlappingReservations > 0;
  }
}
