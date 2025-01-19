import { Module } from '@nestjs/common';
import { ServiceManagementController } from './service_management.controller';
import { ServiceManagementService } from './service_management.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Services, ServicesSchema } from '@app/shared/schemas/services.schema';
import { VAS, VASSchema } from '@app/shared/schemas/vas.schema';
import { MongoRepository } from '@app/database/repository/mongo.repository';
import { Model } from 'mongoose';
import { NotificationsModule } from '@app/notifications';
import { PaymentGatewayModule } from '@app/payment_gateway';
import { Bill, BillSchema } from '@app/shared/schemas/bill.schema';
import configuration from '@app/core/configuration';
import { CoreModule } from '@app/core';

@Module({
  imports: [
    NotificationsModule,
    DatabaseModule,
    PaymentGatewayModule,
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forFeature([
      { name: 'Services', schema: ServicesSchema },
      { name: 'VAS', schema: VASSchema },
      { name: 'Bill', schema: BillSchema },
    ]),
  ],
  controllers: [ServiceManagementController],
  providers: [
    {
      provide: 'ServicesRepository',
      useFactory: (model: Model<Services>) => new MongoRepository(model),
      inject: [getModelToken('Services')],
    },
    {
      provide: 'VASRepository',
      useFactory: (model: Model<VAS>) => new MongoRepository(model),
      inject: [getModelToken('VAS')],
    },
    {
      provide: 'BillRepository',
      useFactory: (model: Model<Bill>) => new MongoRepository(model),
      inject: [getModelToken('Bill')],
    },
    ServiceManagementService,
  ],
  exports: ['ServicesRepository', 'VASRepository', 'BillRepository'],
})
export class ServiceManagementModule {}
