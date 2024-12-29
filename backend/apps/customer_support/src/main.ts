import { NestFactory } from '@nestjs/core';
import { CustomerSupportModule } from './customer_support.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomerSupportModule);
  await app.listen( process.env.PORT ?? 3000);
}
bootstrap();
