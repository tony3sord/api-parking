import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParkingSpotDto } from '../dto/index';
import { ParkingSpotRepository } from '../repository/parkingSpot.repository';
import { ParkingSpot } from '../entities/parkingSpot.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../user/repository/user.repository';
import { ParkingService } from 'src/modules/parking/service/parking.service';
import { Parking } from 'src/modules/parking/entities/parking.entity';

@Injectable()
export class ParkingSpotService {
  constructor(
    private readonly parkingSpotRepository: ParkingSpotRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly parkingService: ParkingService,
  ) {}

  async create(
    createParkingSpotDto: CreateParkingSpotDto,
    token: string,
  ): Promise<ParkingSpot> {
    const parking: Parking = await this.parkingService.findOne(
      createParkingSpotDto.parking,
    );
    const validation: number =
      await this.parkingSpotRepository.getStateParkingForReservationDate(
        createParkingSpotDto,
      );
    if (validation >= parking.ability) {
      throw new ConflictException(
        'Parking is not available for the date and time indicated.',
      );
    }
    if (!parking) {
      throw new NotFoundException('This parking not found');
    }
    const decodedToken = this.jwtService.decode(token);
    const user = await this.userRepository.getForId(decodedToken.idUser);

    return await this.parkingSpotRepository.reqParkCar(
      createParkingSpotDto,
      user,
      parking,
    );
  }

  async getState(): Promise<boolean> {
    return await this.parkingSpotRepository.getStateNow();
  }

  async createParkingSpace(): Promise<boolean> {
    return await this.parkingSpotRepository.getStateNow();
  }

  async getLogs(): Promise<ParkingSpot[]> {
    return await this.parkingSpotRepository.getLogsForAdmin();
  }
}
