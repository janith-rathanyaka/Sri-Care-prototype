// libs/payment-gateway/src/mock-payment-gateway.service.ts
import { PaymentGateway } from '@app/shared/interface/payment-gateway.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockPaymentGatewayService implements PaymentGateway {
  async processPayment(userId: string, amount: number): Promise<{ status: string; transactionId: string }> {
    console.log(`Mock payment processed for user ${userId} with amount ${amount}`);
    return { status: 'success', transactionId: `mock-txn-${Date.now()}` };
  }

  async refundPayment(transactionId: string): Promise<{ status: string }> {
    console.log(`Mock refund processed for transaction ${transactionId}`);
    return { status: 'success' };
  }
}
