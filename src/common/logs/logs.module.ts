// log.module.ts
import { Module } from '@nestjs/common';
import { LogService } from './logs.service';

@Module({
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
