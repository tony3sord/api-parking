import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateParkingDto {
  @ApiProperty({
    description:
      'Details of the vehicle, such as make, model, and license plate.',
    example: 'Toyota Corolla 2022 - ABC123',
  })
  @IsString()
  vehicleDetails: string;

  @ApiProperty({
    description:
      'The date and time of the parking reservation (ISO 8601 format).',
    example: '2025-04-26T14:30:00Z',
  })
  @IsDateString()
  reservationDate: string;

  @ApiProperty({
    description: 'The duration of the parking reservation in seconds.',
    example: 7200, 
  })
  @IsInt()
  reservationTime: number;
}
