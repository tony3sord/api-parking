import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateParkingDto {
  @ApiProperty({
    description: 'The name of the parking',
    example: 'Downtown Parking Lot',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'The maximum capacity of the parking (number of vehicles it can hold)',
    example: 50,
  })
  @IsNumber()
  @IsPositive()
  ability: number;
}
