import { EntityManager } from 'typeorm';
import { Parking } from '../entities/parking.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { CreateParkingDto, UpdateParkingDto } from '../dto';
import { ParkingSpot } from 'src/modules/parkingSpot/entities/parkingSpot.entity';
dotenv.config();

@Injectable()
export class ParkingRepository {
  constructor(
    @InjectEntityManager(process.env.POSTGRES_DB_CONNECTION_NAME)
    private readonly dataSource: EntityManager,
  ) {}
  async getParkings(): Promise<Parking[]> {
    return this.dataSource.getRepository(Parking).find();
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

  async getParking(id: number): Promise<Parking> {
    const parkRepository = this.dataSource.getRepository(Parking);

    const parking: Parking = await parkRepository
      .createQueryBuilder('parking')
      .leftJoinAndSelect(
        'parking.parkingSpot',
        'parkingspot',
        'parkingspot.reservationDate < :dateNow AND parkingspot.reservationFinish > :dateNow',
        { dateNow: new Date() },
      )
      .where('parking.id = :id', { id })
      .getOne();

    const dataFullParking = {
      ...parking,
      available: parking.ability - parking.parkingSpot.length,
      occupied: parking.parkingSpot.length,
    };

    return dataFullParking;
  }

  async updateParking(
    id: number,
    updateParkingDto: UpdateParkingDto,
  ): Promise<Parking> {
    const parkRepository = this.dataSource.getRepository(Parking);

    const parking = await parkRepository.findOneBy({ id });
    if (!parking) {
      throw new NotFoundException(`Parking with ID ${id} not found`);
    }

    Object.assign(parking, updateParkingDto);

    return await parkRepository.save(parking);
  }

  async deleteParking(id: number): Promise<string> {
    const parkRepository = this.dataSource.getRepository(Parking);
    const parking = await parkRepository.findOneBy({ id });
    if (!parking) {
      throw new NotFoundException(`Parking with ID ${id} not found`);
    }
    await parkRepository.delete(id);
    return `Parking deleted successfully`;
  }
}
