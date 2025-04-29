import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpotModule } from './modules/parkingSpot/parkingSpot.module';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './common/database/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/middleware/logs.middleware';
import { LogModule } from './common/logs/logs.module';
import { AuthModule } from './modules/auth/auth.module';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Configuration for Postgres
    TypeOrmModule.forRoot(databaseProviders.postgres),
    // Configuration for MongoDB
    TypeOrmModule.forRoot(databaseProviders.mongodb),
    ParkingSpotModule,
    UserModule,
    LogModule,
    AuthModule,
    ParkingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
