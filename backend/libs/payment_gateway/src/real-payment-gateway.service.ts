// libs/payment-gateway/src/real-payment-gateway.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PaymentGateway } from '@app/shared/interface/payment-gateway.interface';

@Injectable()
export class RealPaymentGatewayService implements PaymentGateway {
  constructor(private readonly httpService: HttpService) {}

  async processPayment(userId: string, amount: number): Promise<{ status: string; transactionId: string }> {
    const url = 'https://real-payment-gateway.com/api/process-payment';
    const response = await firstValueFrom(this.httpService.post(url, { userId, amount }));
    return response?.data;
  }

  async refundPayment(transactionId: string): Promise<{ status: string }> {
    const url = 'https://real-payment-gateway.com/api/refund';
    const response = await firstValueFrom(this.httpService.post(url, { transactionId }));
    return response?.data;
  }
}
