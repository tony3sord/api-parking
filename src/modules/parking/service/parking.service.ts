import { Injectable } from '@nestjs/common';
import { CreateParkingDto, UpdateParkingDto } from '../dto/index';
import { ParkingRepository } from '../repository/parking.repository';

@Injectable()
export class ParkingService {
  constructor(private readonly parkingRepository: ParkingRepository) {}
  async create(createParkingDto: CreateParkingDto) {
    return 'This action adds a new parking';
  }

  async findAll() {
    return `This action returns all parking`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} parking`;
  }

  async update(id: number, updateParkingDto: UpdateParkingDto) {
    return `This action updates a #${id} parking`;
  }

  async remove(id: number) {
    return `This action removes a #${id} parking`;
  }
}
