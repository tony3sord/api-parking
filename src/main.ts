import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT ?? 3000;
  const server = await app.listen(port);

  const address = server.address();

  const host = address.address === '::' ? 'localhost' : address.address;

  console.log(`🚀 Server running in http://${host}:${address.port}`);
}
bootstrap();
