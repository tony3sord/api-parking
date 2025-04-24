import * as dotenv from 'dotenv';
import { UsuarioRepository } from 'src/usuario/repository/usuario.repository';
import { Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { LoginUsuarioDto } from '../dto/loginusuario';
import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest } from 'express';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import * as bcrypt from 'bcrypt';

dotenv.config();

interface RequestWithUser extends ExpressRequest {
  user: Usuario;
}

@Injectable()
export class AuthService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: any) {
    return await this.usuarioRepository.getUsuario(payload.sub);
  }

  async login(user: LoginUsuarioDto) {
    const payload = { user: user.email };
    const userBD = await this.usuarioRepository.getUsuarioByEmail(user.email);
    if (!userBD || !(await bcrypt.compareSync(user.password, userBD.password)))
      throw new UnauthorizedException('Invalid credentials');

    const token = {
      token: this.jwtService.sign(payload, {
        secret: process.env.AUTH_TOKEN,
      }),
    };
    return token;
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.AUTH_TOKEN });
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getMe(@Req() req: RequestWithUser) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    const usuario = await this.usuarioRepository.getUsuarioByEmail(
      user.toString(),
    );
    const { password, ...result } = usuario;
    return result;
  }
}
