import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateParkingDto {
  @ApiProperty({
    description:
      'Details of the vehicle, such as make, model, and license plate.',
    example: 'Toyota Corolla 2022 - ABC123',
  })
  @IsString()
  vehicleDetails: string;

  @ApiProperty({
    description: 'The date of the parking reservation in milliseconds.',
    example: 1745673000000,
  })
  @IsNumber()
  reservationDate: string;

  @ApiProperty({
    description: 'The time of the parking reservation in milliseconds.',
    example: 1745673000000,
  })
  @IsNumber()
  reservationTime: string;
}
