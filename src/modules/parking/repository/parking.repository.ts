import { EntityManager } from 'typeorm';
import { Parking } from '../entities/parking.entity';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { CreateParkingDto } from '../dto';
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

  async getParkingForName(name: string): Promise<Parking> {
    return this.dataSource
      .getRepository(Parking)
      .createQueryBuilder('parking')
      .where('parking.name = :name', { name })
      .getOne();
  }

  async createParking(createParkingDto: CreateParkingDto): Promise<Parking> {
    const result = await this.dataSource
      .getRepository(Parking)
      .createQueryBuilder()
      .insert()
      .into(Parking)
      .values(createParkingDto)
      .returning('*')
      .execute();

    return result.raw[0];
  }
}
