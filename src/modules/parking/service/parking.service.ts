import { ConflictException, Injectable } from '@nestjs/common';
import { CreateParkingDto } from '../dto/create-parking.dto';
import { UpdateParkingDto } from '../dto/update-parking.dto';
import { ParkingRepository } from '../repository/parking.repository';
import { Parking } from '../entities/parking.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class ParkingService {
  constructor(
    private readonly parkingRepository: ParkingRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(
    createParkingDto: CreateParkingDto,
    token: string,
  ): Promise<Parking> {
    if (
      await this.parkingRepository.getStateParkingForReservationDate(
        createParkingDto,
      )
    ) {
      throw new ConflictException(
        'Parking already exists for the given date and time',
      );
    }
    const decodedToken = this.jwtService.decode(token);
    const user = await this.userRepository.getForId(decodedToken.idUser);

    return await this.parkingRepository.reqParkCar(createParkingDto, user);
  }

  async getState(): Promise<boolean> {
    return await this.parkingRepository.getStateNow();
  }

  async getLogs(): Promise<Parking[]> {
    return await this.parkingRepository.getLogsForAdmin();
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
