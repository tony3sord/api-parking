import { IsEmail, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'El nombre del usuario.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'El apellido del usuario.' })
  @IsString()
  readonly lastname: string;

  @ApiProperty({ description: 'El nombre de usuario del usuario.' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'El correo del usuario.' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'La contraseña del usuario.' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'El rol del usuario.' })
  @IsIn(['Admin', 'Client', 'Worker'])
  readonly role: 'Admin' | 'Client' | 'Worker';
}
