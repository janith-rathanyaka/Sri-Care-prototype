import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BillSchema, Bill } from '@app/shared/schemas/bill.schema';
import { MongoRepository } from '@app/database/repository/mongo.repository';
import { Model } from 'mongoose';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Bill', schema: BillSchema }]),
  ],
  controllers: [BillingController],
  providers: [
    {
      provide: 'BillRepository',
      useFactory: (model: Model<Bill>) => new MongoRepository(model),
      inject: [getModelToken('Bill')],
    },
    BillingService,
  ],
  exports: ['BillRepository'],
})
export class BillingModule {}
