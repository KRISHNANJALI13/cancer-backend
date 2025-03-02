import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/images', express.static(join(__dirname, '..', '..', 'cancer-database', 'public', 'images')));
  app.use('/reports', express.static(join(__dirname, '..', '..', 'cancer-backend', 'public', 'reports')));
  app.enableCors({
    origin: 'http://localhost:3000', // Allow only frontend requests
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies if needed
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
