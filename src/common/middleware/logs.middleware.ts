import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from '../logs/logs.service';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logService: LogService,
    private readonly authService: AuthService,
  ) {
    this.logService = logService;
  }
  private readonly logger = new Logger('HTTP');

  async use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    let user: User | null = null;
    const token: string | undefined =
      req.headers['authorization']?.split(' ')[1];
    if (token) {
      user = await this.authService.verifyToken(token);
    }
    const start = Date.now();

    res.on('finish', async () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      const logMessage = `${method} ${originalUrl} ${statusCode} - ${duration}ms - ${user !== null ? user.username : null} - ${user !== null ? user.role : null}`;
      this.logger.log(logMessage);
      if (process.env.NODE_ENV !== 'test') {
        await this.logService.saveLog(
          method,
          originalUrl,
          statusCode,
          duration,
          user !== null ? user.username : null,
        );
      }
    });

    next();
  }
}
