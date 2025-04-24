import { IsNumber, IsString } from 'class-validator';

export class CreateParkingDto {
  @IsString()
  vehicleDetails: string;

  @IsNumber()
  reservationDate: number;

  @IsNumber()
  reservationTime: number;
}
