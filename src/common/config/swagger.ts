import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('API Parking')
  .setDescription(
    'Esta api fue realizada por tony3sord para gestionar el parking de Guajiritos SSL',
  )
  .setVersion('1.0')
  .build();
