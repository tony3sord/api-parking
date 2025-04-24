import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from '../service/auth.service';
import { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  user: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Lista de rutas que no requieren autenticación
    const openRoutes = ['/auth/login', '/usuario'];

    if (openRoutes.includes(req.path)) {
      console.log(req.path);
      return next();
    }

    try {
      const authHeader = req.headers.authorization; 
      if (!authHeader) throw new UnauthorizedException('No token provided');

      const token = authHeader.split(' ')[1];
      const decoded = await this.authService.verifyToken(token);

      // Aquí asumimos que el payload del token tiene un campo 'user' con el email del usuario
      const user = decoded.user;
      req.user = user;
      if (!user) throw new UnauthorizedException('Invalid token');

      // Agregar el usuario al objeto request

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
