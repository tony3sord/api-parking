import { ConflictException, Injectable } from '@nestjs/common';
import { CreateParkingDto } from '../dto/create-parking.dto';
import { UpdateParkingDto } from '../dto/update-parking.dto';
import { ParkingRepository } from '../repository/parking.repository';

@Injectable()
export class ParkingService {
  constructor(private readonly parkingRepository: ParkingRepository) {}

  async create(createParkingDto: CreateParkingDto) {
    if (
      await this.parkingRepository.getStateParkingForReservationDate(
        createParkingDto,
      )
    ) {
      throw new ConflictException(
        'Parking already exists for the given date and time',
      );
    }

    return await this.parkingRepository.reqParkCar(createParkingDto);
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
