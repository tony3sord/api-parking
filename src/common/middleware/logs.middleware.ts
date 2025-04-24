import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { saveLogs } from '../middleware/service.logs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      const logMessage = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;
      this.logger.log(logMessage);
      saveLogs(method, originalUrl, statusCode, duration);
    });

    next();
  }
}
