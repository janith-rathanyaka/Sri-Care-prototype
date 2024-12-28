import { Controller, Get } from '@nestjs/common';
import { CustomerSupportService } from './customer_support.service';

@Controller()
export class CustomerSupportController {
  constructor(private readonly customerSupportService: CustomerSupportService) {}

  @Get()
  getHello(): string {
    return this.customerSupportService.getHello();
  }
}
