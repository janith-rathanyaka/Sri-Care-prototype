import { NestFactory } from '@nestjs/core';
import { ServiceManagementModule } from './service_management.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceManagementModule);
  await app.listen( process.env.PORT ?? 3003);
}
bootstrap();
