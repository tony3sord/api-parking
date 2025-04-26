import { Module } from '@nestjs/common';
import { ParkingService } from './service/parking.service';
import { ParkingController } from './controller/parking.controller';
import { ParkingRepository } from './repository/parking.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Parking],
      process.env.POSTGRES_DB_CONNECTION_NAME,
    ),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  controllers: [ParkingController],
  providers: [ParkingService, ParkingRepository],
})
export class ParkingModule {}
