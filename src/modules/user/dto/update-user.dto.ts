import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of the user.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The lastname of the user.' })
  @IsString()
  readonly lastname: string;

  @ApiProperty({ description: 'The username of the user.' })
  @IsString({ message: 'Hola' })
  readonly username: string;

  @ApiProperty({ description: 'The email of the user.' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'The password of the user.' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'The role of the user.' })
  @IsIn(['Admin', 'Client', 'Worker'])
  readonly role: 'Admin' | 'Client' | 'Worker';
}
