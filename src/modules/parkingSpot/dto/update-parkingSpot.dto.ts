import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingSpotDto } from './index';

export class UpdateParkingSpotDto extends PartialType(CreateParkingSpotDto) {}
