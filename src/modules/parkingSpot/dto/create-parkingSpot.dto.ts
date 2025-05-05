import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { IsFutureDate } from '../../../common/decorators/is-future-date.decorator';

export class CreateParkingSpotDto {
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
  @IsFutureDate()
  reservationDate: string;

  @ApiProperty({
    description: 'The duration of the parking reservation in seconds.',
    example: 7200,
  })
  @IsInt()
  reservationTime: number;

  @ApiProperty({
    description: 'The ID of the parking to which this parking spot belongs.',
    example: 1,
  })
  @IsNumber()
  @IsInt()
  @IsPositive()
  parking: number;
}
