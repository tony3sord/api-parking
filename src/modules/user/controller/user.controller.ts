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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    description: 'The data required to create a user',
    type: CreateUserDto,
  })
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user and returns the created user object.',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation failed.',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Returns a list of all users.',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of users.',
    type: [User],
  })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Returns a user object based on the provided ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to retrieve.',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'The user object.',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(RolesEnum.Admin)
  @ApiBody({
    description: 'The data required to create a user',
    type: UpdateUserDto,
  })
  @ApiOperation({
    summary: 'Update a user by ID',
    description: 'Updates the details of an existing user.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update.',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated user object.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation failed.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user by ID',
    description: 'Deletes a user based on the provided ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to delete.',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async remove(@Param('id') id: string): Promise<string> {
    return await this.userService.remove(id);
  }
}
