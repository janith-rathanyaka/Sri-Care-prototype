import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const config = new DocumentBuilder()
    .setTitle('Billing')
    .setDescription('Billing API description')
    .setVersion('1.0')
    .addTag('billing_api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
