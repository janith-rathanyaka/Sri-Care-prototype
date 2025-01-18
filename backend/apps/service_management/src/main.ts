import { NestFactory } from '@nestjs/core';
import { ServiceManagementModule } from './service_management.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ServiceManagementModule);
  app.enableCors();
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
