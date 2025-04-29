import { ConflictException, Injectable } from '@nestjs/common';
import { CreateParkingDto, UpdateParkingDto } from '../dto/index';
import { ParkingRepository } from '../repository/parking.repository';

@Injectable()
export class ParkingService {
  constructor(private readonly parkingRepository: ParkingRepository) {}
  async create(createParkingDto: CreateParkingDto) {
    try {
      const validation = await this.parkingRepository.getParkingForName(
        createParkingDto.name,
      );
      if (validation) {
        throw new ConflictException('Parking already exists');
      }
      return await this.parkingRepository.createParking(createParkingDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.parkingRepository.getParkings();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.parkingRepository.getParking(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateParkingDto: UpdateParkingDto) {
    try {
      return await this.parkingRepository.updateParking(id, updateParkingDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.parkingRepository.deleteParking(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
