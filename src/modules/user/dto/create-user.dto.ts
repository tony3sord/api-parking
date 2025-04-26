import { IsEmail, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user.', example: 'Tony' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The lastname of the user.', example: 'Aliaga' })
  @IsString()
  readonly lastname: string;

  @ApiProperty({
    description: 'The username of the user.',
    example: 'tony3sord',
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: 'The email of the user.',
    example: 'tony@gmail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The phone number of the user.',
    example: '+53 55964629',
  })
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: 'The password of the user.', example: '*****' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'The role of the user.', example: 'Worker' })
  @IsIn(['Admin', 'Client', 'Worker'])
  readonly role: 'Admin' | 'Client' | 'Worker';
}
