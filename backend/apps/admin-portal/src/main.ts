import { NestFactory } from '@nestjs/core';
import { AdminPortalModule } from './admin-portal.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AdminPortalModule);
  app.enableCors();
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3006);
}
bootstrap();
