import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingModule } from './modules/parking/parking.module';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './common/database/typeorm.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Configuration for Postgres
    TypeOrmModule.forRoot(databaseProviders.postgres),
    // Configuration for MongoDB
    TypeOrmModule.forRoot(databaseProviders.mongodb),
    ParkingModule,
    UserModule,
  ],
})
export class AppModule {}
