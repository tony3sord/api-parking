import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ParkingSpotService } from '../service/parkingSpot.service';
import { CreateParkingSpotDto } from '../dto/index';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorators';
import { RolesEnum } from '../../../common/enums/roles.enum';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParkingSpot } from '../entities/parkingSpot.entity';

@ApiTags('ParkingSpot')
@Controller('parkingSpot')
@UseGuards(RolesGuard)
export class ParkingController {
  constructor(private readonly parkingService: ParkingSpotService) {}

  @Post()
  @Roles(RolesEnum.Client)
  @ApiOperation({
    summary: 'Create a new parking entry',
    description: 'Allows an client to create a new parking entry.',
  })
  @ApiResponse({
    status: 201,
    description: 'The parking entry has been successfully created.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is missing or invalid.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Conflict. There is already a car parked at the specified time.',
  })
  @ApiBody({
    description: 'The data required to create a parking entry',
    type: CreateParkingSpotDto,
  })
  async create(
    @Body() createParkingDto: CreateParkingSpotDto,
    @Headers('authorization') token: string,
  ) {
    return await this.parkingService.create(
      createParkingDto,
      token.split(' ')[1],
    );
  }

  @Get()
  @Roles(RolesEnum.Worker)
  @ApiOperation({
    summary: 'Check parking availability',
    description:
      'Returns true if the parking is currently occupied, and false if it is available.',
  })
  @ApiResponse({
    status: 200,
    description: 'The current state of the parking (occupied or available).',
    schema: {
      type: 'boolean',
      example: true,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is missing or invalid.',
  })
  async getState() {
    return this.parkingService.getState();
  }
}
