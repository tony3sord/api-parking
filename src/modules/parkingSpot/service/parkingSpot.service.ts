import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParkingSpotDto, UpdateParkingSpotDto } from '../dto/index';
import { ParkingSpotRepository } from '../repository/parkingSpot.repository';
import { ParkingSpot } from '../entities/parkingSpot.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../user/repository/user.repository';
import { ParkingService } from 'src/modules/parking/service/parking.service';

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
    if (
      await this.parkingSpotRepository.getStateParkingForReservationDate(
        createParkingSpotDto,
      )
    ) {
      throw new ConflictException(
        'Parking already exists for the given date and time',
      );
    }
    const parking = await this.parkingService.findOne(
      createParkingSpotDto.parking,
    );
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

  findOne(id: number) {
    return `This action returns a #${id} parking`;
  }

  update(id: number, updateParkingSpotDto: UpdateParkingSpotDto) {
    return `This action updates a #${id} parking`;
  }

  remove(id: number) {
    return `This action removes a #${id} parking`;
  }
}
