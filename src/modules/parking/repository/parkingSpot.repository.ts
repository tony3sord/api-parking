import { EntityManager } from 'typeorm';
import { Parking } from '../entities/parking.entity';
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
  async getParkings(): Promise<Parking[]> {
    const parkRepository = this.dataSource.getRepository(Parking);
    return await parkRepository.find();
  }
}
