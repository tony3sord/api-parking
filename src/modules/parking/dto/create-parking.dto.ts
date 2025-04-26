import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateParkingDto {
  @ApiProperty({
    description:
      'Details of the vehicle, such as make, model, and license plate.',
    example: 'Toyota Corolla 2022 - ABC123',
  })
  @IsString()
  vehicleDetails: string;

  @ApiProperty({
    description: 'The date of the parking reservation in ISO 8601 format.',
    example: '2025-04-26',
    format: 'date',
  })
  @IsDateString()
  reservationDate: string;

  @ApiProperty({
    description: 'The time of the parking reservation in ISO 8601 format.',
    example: '2025-04-26T14:00:00Z',
    format: 'date-time',
  })
  @IsDateString()
  reservationTime: string;
}
