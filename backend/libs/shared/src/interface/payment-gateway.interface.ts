// libs/payment-gateway/src/interfaces/payment-gateway.interface.ts
export abstract class PaymentGateway {
    abstract processPayment(userId: string, amount: number): Promise<{
      status: string;
      transactionId: string;
    }>;
  
    abstract refundPayment(transactionId: string): Promise<{ status: string }>;
  }
  