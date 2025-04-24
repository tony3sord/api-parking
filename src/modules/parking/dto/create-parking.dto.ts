import { IsDateString, IsString } from 'class-validator';

export class CreateParkingDto {
  @IsString()
  vehicleDetails: string;

  @IsDateString()
  reservationDate: string;

  @IsDateString()
  reservationTime: string;
}
