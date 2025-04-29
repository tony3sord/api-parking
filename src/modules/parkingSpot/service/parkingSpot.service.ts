import { ConflictException, Injectable } from '@nestjs/common';
import { CreateParkingSpotDto, UpdateParkingSpotDto } from '../dto/index';
import { ParkingSpotRepository } from '../repository/parkingSpot.repository';
import { ParkingSpot } from '../entities/parkingSpot.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class ParkingSpotService {
  constructor(
    private readonly parkingRepository: ParkingSpotRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(
    createParkingSpotDto: CreateParkingSpotDto,
    token: string,
  ): Promise<ParkingSpot> {
    if (
      await this.parkingRepository.getStateParkingForReservationDate(
        createParkingSpotDto,
      )
    ) {
      throw new ConflictException(
        'Parking already exists for the given date and time',
      );
    }
    const decodedToken = this.jwtService.decode(token);
    const user = await this.userRepository.getForId(decodedToken.idUser);

    return await this.parkingRepository.reqParkCar(createParkingSpotDto, user);
  }

  async getState(): Promise<boolean> {
    return await this.parkingRepository.getStateNow();
  }

  async createParkingSpace(): Promise<boolean> {
    return await this.parkingRepository.getStateNow();
  }

  async getLogs(): Promise<ParkingSpot[]> {
    return await this.parkingRepository.getLogsForAdmin();
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
