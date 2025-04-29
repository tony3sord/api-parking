import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ParkingSpotService } from '../service/parkingSpot.service';
import { CreateParkingSpotDto, UpdateParkingSpotDto } from '../dto/index';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorators';
import { RolesEnum } from '../../../common/enums/roles.enum';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParkingSpot } from '../entities/parkingSpot.entity';

@ApiTags('Parking')
@Controller('parking')
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

  @Get('logs')
  @Roles(RolesEnum.Admin)
  @ApiOperation({
    summary: 'Get parking logs',
    description:
      'Returns a list of all parking logs, including details of reservations.',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of logs of the parking.',
    type: [ParkingSpot],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is missing or invalid.',
  })
  async getLogs(): Promise<ParkingSpot[]> {
    return this.parkingService.getLogs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParkingDto: UpdateParkingSpotDto,
  ) {
    return this.parkingService.update(+id, updateParkingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingService.remove(+id);
  }
}
