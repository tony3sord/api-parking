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
import { ParkingService } from '../service/parking.service';
import { CreateParkingDto } from '../dto/create-parking.dto';
import { UpdateParkingDto } from '../dto/update-parking.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesEnum } from 'src/common/enums/roles.enum';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Parking } from '../entities/parking.entity';

@ApiTags('Parking')
@Controller('parking')
@UseGuards(RolesGuard)
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  @Roles(RolesEnum.Client)
  @ApiOperation({
    summary: 'Create a new parking entry',
    description: 'Allows an admin to create a new parking entry.',
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
    type: CreateParkingDto,
  })
  create(
    @Body() createParkingDto: CreateParkingDto,
    @Headers('authorization') token: string,
  ) {
    return this.parkingService.create(createParkingDto, token.split(' ')[1]);
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
    type: [Parking],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is missing or invalid.',
  })
  async getLogs(): Promise<Parking[]> {
    return this.parkingService.getLogs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    return this.parkingService.update(+id, updateParkingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingService.remove(+id);
  }
}
