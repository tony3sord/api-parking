import { Module } from '@nestjs/common';
import { ParkingModule } from './modules/parking/parking.module';

@Module({
  imports: [ParkingModule],
})
export class AppModule {}
