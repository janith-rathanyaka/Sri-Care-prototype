import { NestFactory } from '@nestjs/core';
import { ServiceManagementModule } from './service_management.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ServiceManagementModule);
  const config = new DocumentBuilder()
    .setTitle('Service Management')
    .setDescription('Service Management API description')
    .setVersion('1.0')
    .addTag('service_management_api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
