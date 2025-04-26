import { EntityManager } from 'typeorm';
import { Parking } from '../entities/parking.entity';
import { CreateParkingDto, UpdateParkingDto } from '../dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ParkingRepository {
  constructor(
    @InjectEntityManager(process.env.POSTGRES_DB_CONNECTION_NAME)
    private readonly dataSource: EntityManager,
  ) {}

  async reqParkCar(createParkingDto: CreateParkingDto): Promise<Parking> {
    const parkRepository = this.dataSource.getRepository(Parking);
    const { reservationDate, reservationTime } = createParkingDto;

    const reservationFinish = reservationDate + reservationTime;
    const reservationFinishUTC = new Date(reservationFinish).toISOString();

    const park = {
      ...createParkingDto,
      reservationFinish: reservationFinishUTC,
    };

    const newReqParking = parkRepository.create(park);

    return await parkRepository.save(newReqParking);
  }
}
