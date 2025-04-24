import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/user/entities/user.entity';
dotenv.config();

export const databaseProviders: {
  postgres: TypeOrmModuleOptions;
  mongodb: TypeOrmModuleOptions;
} = {
  // Configuración para Postgres
  postgres: {
    type: 'postgres',
    host: process.env.POSTGRES_DB_HOST,
    port: parseInt(process.env.POSTGRES_DB_PORT as string) || 5432,
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    entities: [User],
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
  },

  // Configuración para MongoDB
  mongodb: {
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
