import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from '@app/shared/schemas/user.schema';
import { MongoRepository } from '@app/database/repository/mongo.repository';
import { DatabaseModule } from '@app/database';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessManagementController } from './access_management.controller';
import { AccessManagementService } from './access_management.service';
import { ProvisioningSystemModule } from '@app/provisioning_system';
import { OtpGenerateModule } from '@app/otp-generate';
import { NotificationsModule } from '@app/notifications';
import { VAS, VASSchema } from '@app/shared/schemas/vas.schema';
import { CoreModule } from '@app/core';
import configuration from '@app/core/configuration';

@Module({
  imports: [
    CoreModule,
    NotificationsModule,
    OtpGenerateModule,
    ProvisioningSystemModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'VAS', schema: VASSchema },
    ]),
  ],
  controllers: [AccessManagementController],
  providers: [
    {
      provide: 'UserRepository',
      useFactory: (model: Model<User>) => new MongoRepository(model),
      inject: [getModelToken('User')],
    },
    {
      provide: 'VASRepository',
      useFactory: (model: Model<VAS>) => new MongoRepository(model),
      inject: [getModelToken('VAS')],
    },
    AccessManagementService,
  ],
  exports: ['UserRepository',  'VASRepository'],
})
export class AccessManagementModule {}
