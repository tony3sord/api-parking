import { Module } from '@nestjs/common';
import { ParkingService } from './service/parking.service';
import { ParkingController } from './controller/parking.controller';
import { ParkingRepository } from './repository/parking.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Parking],
      process.env.POSTGRES_DB_CONNECTION_NAME,
    ),
  ],
  controllers: [ParkingController],
  providers: [ParkingService, ParkingRepository],
})
export class ParkingModule {}
