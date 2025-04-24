import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from '../logs/logs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) {
    this.logService = logService;
  }
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', async () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      const logMessage = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;
      this.logger.log(logMessage);
      await this.logService.saveLog(method, originalUrl, statusCode, duration);
    });

    next();
  }
}
