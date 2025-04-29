import { Module } from '@nestjs/common';
import { ParkingService } from './service/parking.service';
import { ParkingController } from './controller/parking.controller';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
