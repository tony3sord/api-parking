import { IsEmail, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The lastname of the user.' })
  @IsString()
  readonly lastname: string;

  @ApiProperty({ description: 'The username of the user.' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'The email of the user.' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'The phone number of the user.' })
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: 'The password of the user.' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'The role of the user.' })
  @IsIn(['Admin', 'Client', 'Worker'])
  readonly role: 'Admin' | 'Client' | 'Worker';
}
