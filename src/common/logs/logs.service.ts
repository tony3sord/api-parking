import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Log } from './logs.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectEntityManager(process.env.MONGO_DB_CONNECTION_NAME) // nombre de la conexión si usas una base distinta
    private readonly entityManager: EntityManager,
  ) {}

  async saveLog(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
  ) {
    const log = this.entityManager.create(Log, {
      method,
      url,
      statusCode,
      duration,
    });

    await this.entityManager.save(log);
  }
}
