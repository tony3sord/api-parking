import { Module } from '@nestjs/common';
import { ParkingService } from './service/parking.service';
import { ParkingController } from './controller/parking.controller';
import { ParkingRepository } from './repository/parking.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService, ParkingRepository],
  exports: [ParkingService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
})
export class ParkingModule {}
