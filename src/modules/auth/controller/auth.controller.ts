import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginUsuarioDto } from '../dto/loginusuario';
import { AuthService } from '../service/auth.service';
import { Request as ExpressRequest } from 'express';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { UsuarioRepository } from 'src/usuario/repository/usuario.repository';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

interface RequestWithUser extends ExpressRequest {
  user: Usuario;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioRepositorio: UsuarioRepository,
  ) {}

  @Post('login')
  @ApiProperty({ type: LoginUsuarioDto })
  @ApiOperation({ summary: 'Login' })
  async Login(@Body() loginDto: LoginUsuarioDto) {
    return await this.authService.login(loginDto);
  }

  @Get()
  @ApiOperation({ summary: 'Devuelve el usaurio autenticado' })
  async getMe(@Req() req: RequestWithUser) {
    return await this.authService.getMe(req);
  }
}
