import { Module } from '@nestjs/common';
import { ParkingService } from './service/parking.service';
import { ParkingController } from './controller/parking.controller';
import { ParkingRepository } from './repository/parking.repository';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService, ParkingRepository],
})
export class ParkingModule {}
