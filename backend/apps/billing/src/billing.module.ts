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
import { BillingCronService } from './billing-cron.service';
import { User, UserSchema } from '@app/shared/schemas/user.schema';
import { VAS, VASSchema } from '@app/shared/schemas/vas.schema';
import { NotificationsModule } from '@app/notifications';
import configuration from '@app/core/configuration';
import { CoreModule } from '@app/core';

@Module({
  imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
    NotificationsModule,
    DatabaseModule,
    CoreModule,
    MongooseModule.forFeature([
      { name: 'Bill', schema: BillSchema },
    { name: 'User', schema: UserSchema },
     { name: 'VAS', schema: VASSchema },
    ]),
  ],
  controllers: [BillingController],
  providers: [
    {
      provide: 'BillRepository',
      useFactory: (model: Model<Bill>) => new MongoRepository(model),
      inject: [getModelToken('Bill')],
    },
    {
      provide: 'VASRepository',
      useFactory: (model: Model<VAS>) => new MongoRepository(model),
      inject: [getModelToken('VAS')],
    },
       {
          provide: 'UserRepository',
          useFactory: (model: Model<User>) => new MongoRepository(model),
          inject: [getModelToken('User')],
        },
    BillingService, BillingCronService
  ],
  exports: ['BillRepository'],
})
export class BillingModule {}
