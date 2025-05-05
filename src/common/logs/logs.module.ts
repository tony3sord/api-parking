// log.module.ts
import { Module } from '@nestjs/common';
import { LogService } from './logs.service';
import { AuthModule } from '../../modules/auth/auth.module';

@Module({
  providers: [LogService],
  exports: [LogService],
  imports: [AuthModule],
})
export class LogModule {}
