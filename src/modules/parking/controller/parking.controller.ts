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
  @Roles(RolesEnum.Client)
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
    return this.parkingService.create(createParkingDto);
  }

  @Get()
  findAll() {
    return this.parkingService.findAll();
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
