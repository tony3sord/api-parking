import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingModule } from './modules/parking/parking.module';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './common/database/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/middleware/logs.middleware';
import { LogModule } from './common/logs/logs.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Configuration for Postgres
    TypeOrmModule.forRoot(databaseProviders.postgres),
    // Configuration for MongoDB
    TypeOrmModule.forRoot(databaseProviders.mongodb),
    ParkingModule,
    UserModule,
    LogModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
