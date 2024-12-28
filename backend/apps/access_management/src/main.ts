import { NestFactory } from '@nestjs/core';
import { AccessManagementModule } from './access_management.module';

async function bootstrap() {
  const app = await NestFactory.create(AccessManagementModule);
  await app.listen(3000);
}
bootstrap();
