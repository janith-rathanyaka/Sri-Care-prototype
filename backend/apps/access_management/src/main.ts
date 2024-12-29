import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AccessManagementModule } from './access_management.module';

async function bootstrap() {
  const app = await NestFactory.create(AccessManagementModule);
  app.enableCors();
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
