import { NestFactory } from '@nestjs/core';
import { ServiceManagementModule } from './service_management.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceManagementModule);
  await app.listen(3000);
}
bootstrap();
