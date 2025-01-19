// src/billing/billing-cron.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BillingService } from './billing.service';

@Injectable()
export class BillingCronService {
  constructor(private readonly billingService: BillingService) {}

  @Cron('0 0 * * *') // Runs daily at midnight
  async handleDailyTasks() {
    await this.billingService.generateBill();
    await this.billingService.notifyDueBills();
    await this.billingService.disconnectService();
  }
}
