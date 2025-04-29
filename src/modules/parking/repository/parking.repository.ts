import { EntityManager } from 'typeorm';
import { Parking } from '../entities/parking.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { CreateParkingDto, UpdateParkingDto } from '../dto';
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

  async getParking(id: number): Promise<Parking> {
    const parkRepository = this.dataSource.getRepository(Parking);
    return await parkRepository
      .createQueryBuilder('parking')
      .where('id = :id', { id })
      .getOne();
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
