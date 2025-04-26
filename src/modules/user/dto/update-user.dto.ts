import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of the user.', example: 'Tony' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ description: 'The lastname of the user.', example: 'Aliaga' })
  @IsString()
  @IsOptional()
  readonly lastname?: string;

  @ApiProperty({
    description: 'The username of the user.',
    example: 'tony3sord',
  })
  @IsString()
  @IsOptional()
  readonly username?: string;

  @ApiProperty({
    description: 'The email of the user.',
    example: 'tony@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    description: 'The phone number of the user.',
    example: '+53 55964629',
  })
  @IsString()
  @IsOptional()
  readonly phone?: string;

  @ApiProperty({
    description: 'The role of the user.',
    example: 'Worker',
  })
  @IsIn(['Admin', 'Client', 'Worker'])
  @IsOptional()
  readonly role?: 'Admin' | 'Client' | 'Worker';
}
