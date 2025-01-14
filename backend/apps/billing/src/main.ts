import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  app.enableCors();
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen( process.env.PORT ?? 3001);
}
bootstrap();
