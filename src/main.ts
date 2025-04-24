import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { configSwagger } from './common/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/', app, document);

  const port = process.env.PORT ?? 3000;
  const server = await app.listen(port);

  const address = server.address();

  const host = address.address === '::' ? 'localhost' : address.address;

  console.log(`🚀 Server running in http://${host}:${address.port}`);
}
bootstrap();
