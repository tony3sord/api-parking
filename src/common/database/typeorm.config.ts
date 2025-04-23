import { DataSource } from 'typeorm';

export const databaseProviders = [
  // Configuration for Postgres
  {
    provide: 'POSTGRES_DATA_SOURCE',
    useFactory: async () => {
      const dataSourcePostgres = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_DB_HOST,
        port: parseInt(process.env.POSTGRES_DB_PORT as string) || 5432,
        username: process.env.POSTGRES_DB_USER,
        password: process.env.POSTGRES_DB_PASSWORD,
        database: process.env.POSTGRES_DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV === 'production' ? false : true,
      });

      return dataSourcePostgres.initialize();
    },
  },

  // Configuration for MongoDB
  {
    provide: 'MONGODB_DATA_SOURCE',
    useFactory: async () => {
      const dataSourceMongo = new DataSource({
        type: 'mongodb',
        host: process.env.MONGO_DB_HOST,
        port: parseInt(process.env.MONGO_DB_PORT as string) || 27017,
        username: process.env.MONGO_DB_USER,
        password: process.env.MONGO_DB_PASSWORD,
        database: process.env.MONGO_DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV === 'production' ? false : true,
      });

      return dataSourceMongo.initialize();
    },
  },
];
