import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../service/auth.service';
import { UsuarioRepository } from 'src/usuario/repository/usuario.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const user2 = await this.authService.verifyToken(
        request.headers.authorization.split(' ')[1],
      );
      if (!user2) {
        throw new UnauthorizedException('No user found in request');
      }
      const usuario = await this.usuarioRepository.getUsuarioByEmail(
        user2.user,
      );

      return requiredRoles.includes(usuario.role);
    }
    return false;
  }
}
