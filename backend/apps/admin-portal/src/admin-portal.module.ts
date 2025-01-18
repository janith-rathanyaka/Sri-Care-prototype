import { Module } from '@nestjs/common';
import { AdminPortalController } from './admin-portal.controller';
import { AdminPortalService } from './admin-portal.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Services, ServicesSchema } from '@app/shared/schemas/services.schema';
import { MongoRepository } from '@app/database/repository/mongo.repository';
import { Model } from 'mongoose';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Services', schema: ServicesSchema },
      // { name: 'Customer', schema: CustomerSchema },
    ]),
  ],
  controllers: [AdminPortalController],
  providers: [
    {
      provide: 'ServicesRepository',
      useFactory: (model: Model<Services>) => new MongoRepository(model),
      inject: [getModelToken('Services')],
    },
    AdminPortalService,
  ],
  exports: ['ServicesRepository'],
})
export class AdminPortalModule {}
