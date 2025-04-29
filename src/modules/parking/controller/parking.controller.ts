import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParkingService } from '../service/parking.service';
import { CreateParkingDto, UpdateParkingDto } from '../dto/index';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Parking')
@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  @Roles(RolesEnum.Admin)
  @ApiOperation({
    summary: 'Create a new parking',
    description: 'Allows a client to create a new parking.',
  })
  @ApiResponse({
    status: 201,
    description: 'The parking has been successfully created.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is missing or invalid.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Conflict. A parking with the specified details already exists.',
  })
  @ApiBody({
    description: 'The data required to create a parking',
    type: CreateParkingDto,
  })
  async create(@Body() createParkingDto: CreateParkingDto) {
    return await this.parkingService.create(createParkingDto);
  }

  @Get()
  @Roles(RolesEnum.Client, RolesEnum.Admin)
  @ApiOperation({
    summary: 'Retrieve all parkings',
    description: 'Fetches a list of all parkings available in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of parkings has been successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is missing or invalid.',
  })
  async findAll() {
    return await this.parkingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.parkingService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParkingDto: UpdateParkingDto,
  ) {
    return await this.parkingService.update(+id, updateParkingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.parkingService.remove(+id);
  }
}
