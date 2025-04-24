import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of the user.' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ description: 'The lastname of the user.' })
  @IsString()
  @IsOptional()
  readonly lastname?: string;

  @ApiProperty({ description: 'The username of the user.' })
  @IsString()
  @IsOptional()
  readonly username?: string;

  @ApiProperty({ description: 'The email of the user.' })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ description: 'The phone number of the user.' })
  @IsString()
  @IsOptional()
  readonly phone?: string;

  @ApiProperty({ description: 'The role of the user.' })
  @IsIn(['Admin', 'Client', 'Worker'])
  @IsOptional()
  readonly role?: 'Admin' | 'Client' | 'Worker';
}
