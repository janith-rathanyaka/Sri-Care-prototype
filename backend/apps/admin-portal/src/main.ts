import { NestFactory } from '@nestjs/core';
import { AdminPortalModule } from './admin-portal.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AdminPortalModule);
  const config = new DocumentBuilder()
    .setTitle('Admin Portal')
    .setDescription('Admin Portal API description')
    .setVersion('1.0')
    .addTag('admin_portal_api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3006);
}
bootstrap();
