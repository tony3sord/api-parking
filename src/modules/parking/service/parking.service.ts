import { Injectable } from '@nestjs/common';
import { CreateParkingDto, UpdateParkingDto } from '../dto/index';

@Injectable()
export class ParkingService {
  create(createParkingDto: CreateParkingDto) {
    return 'This action adds a new parking';
  }

  findAll() {
    return `This action returns all parking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parking`;
  }

  update(id: number, updateParkingDto: UpdateParkingDto) {
    return `This action updates a #${id} parking`;
  }

  remove(id: number) {
    return `This action removes a #${id} parking`;
  }
}
