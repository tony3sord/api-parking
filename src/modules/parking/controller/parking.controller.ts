import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ParkingService } from '../service/parking.service';
import { CreateParkingDto, UpdateParkingDto } from '../dto/index';
import { Roles } from '../../../common/decorators/roles.decorators';
import { RolesEnum } from '../../../common/enums/roles.enum';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../../../common/guards/roles.guard';

@ApiTags('Parking')
@UseGuards(RolesGuard)
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
  @Roles(RolesEnum.Worker)
  @ApiOperation({
    summary: 'Retrieve a specific parking',
    description: 'Fetches the details of a specific parking by its ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the parking to retrieve.',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The parking details have been successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is missing or invalid.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. No parking found with the specified ID.',
  })
  async findOne(@Param('id') id: string) {
    return await this.parkingService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RolesEnum.Admin)
  @ApiOperation({
    summary: 'Update a specific parking',
    description: 'Updates the details of a specific parking by its ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the parking to update.',
    type: String,
  })
  @ApiBody({
    description: 'The data required to update the parking',
    type: UpdateParkingDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The parking has been successfully updated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is missing or invalid.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. No parking found with the specified ID.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateParkingDto: UpdateParkingDto,
  ) {
    return await this.parkingService.update(+id, updateParkingDto);
  }

  @Delete(':id')
  @Roles(RolesEnum.Admin)
  @ApiOperation({
    summary: 'Delete a specific parking',
    description: 'Deletes a specific parking by its ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the parking to delete.',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The parking has been successfully deleted.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is missing or invalid.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. No parking found with the specified ID.',
  })
  async remove(@Param('id') id: string) {
    return await this.parkingService.remove(+id);
  }
}
