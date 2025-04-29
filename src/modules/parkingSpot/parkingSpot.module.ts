import { Module } from '@nestjs/common';
import { ParkingSpotService } from './service/parkingSpot.service';
import { ParkingController } from './controller/parkingSpot.controller';
import { ParkingSpotRepository } from './repository/parkingSpot.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpot } from './entities/parkingSpot.entity';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ParkingSpot],
      process.env.POSTGRES_DB_CONNECTION_NAME,
    ),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
    UserModule,
  ],
  controllers: [ParkingController],
  providers: [ParkingSpotService, ParkingSpotRepository],
})
export class ParkingSpotModule {}
