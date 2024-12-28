import { Module } from '@nestjs/common';
import { CustomerSupportController } from './customer_support.controller';
import { CustomerSupportService } from './customer_support.service';

@Module({
  imports: [],
  controllers: [CustomerSupportController],
  providers: [CustomerSupportService],
})
export class CustomerSupportModule {}
