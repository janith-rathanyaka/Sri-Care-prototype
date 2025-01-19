import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment_gateway.service';
import { MockPaymentGatewayService } from './mock-payment-gateway.service';
import { RealPaymentGatewayService } from './real-payment-gateway.service';
import { PaymentGateway } from '@app/shared/interface/payment-gateway.interface';
@Module({
  providers: [
    {
      provide: PaymentGateway,
      useClass: process.env.USE_REAL_GATEWAY === 'true' ?  RealPaymentGatewayService : MockPaymentGatewayService,
    },
  ],
  exports: [PaymentGateway],
})
export class PaymentGatewayModule {}
