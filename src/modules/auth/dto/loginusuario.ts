import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUsuarioDto {
  @ApiProperty({ description: 'El correo del usuario.' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'La contraseña del usuario.' })
  @IsString()
  readonly password: string;
}
