import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ParkingSpot } from '../../modules/parkingSpot/entities/parkingSpot.entity';
import { User } from '../../modules/user/entities/user.entity';
import { Parking } from '../../modules/parking/entities/parking.entity';
dotenv.config();

export const databaseProviders: {
  postgres: TypeOrmModuleOptions;
  mongodb: TypeOrmModuleOptions;
} = {
  // Configuración para Postgres
  postgres: {
    name: process.env.POSTGRES_DB_CONNECTION_NAME,
    type: 'postgres',
    host: process.env.POSTGRES_DB_HOST,
    port: parseInt(process.env.POSTGRES_DB_PORT as string) || 5432,
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    entities: [User, ParkingSpot, Parking],
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
  },

  // Configuración para MongoDB
  mongodb: {
    name: process.env.MONGO_DB_CONNECTION_NAME,
    type: 'mongodb',
    host: process.env.MONGO_DB_HOST,
    port: parseInt(process.env.MONGO_DB_PORT as string) || 27017,
    // username: process.env.MONGO_DB_USER,
    // password: process.env.MONGO_DB_PASSWORD,
    database: process.env.MONGO_DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
  },
};
