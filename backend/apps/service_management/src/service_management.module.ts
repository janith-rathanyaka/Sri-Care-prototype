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

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Services', schema: ServicesSchema },
      { name: 'VAS', schema: VASSchema },
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
    ServiceManagementService,
  ],
  exports: ['ServicesRepository', 'VASRepository'],
})
export class ServiceManagementModule {}
