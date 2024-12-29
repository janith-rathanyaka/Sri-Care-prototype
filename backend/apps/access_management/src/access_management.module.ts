import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserDocument, UserSchema } from '@app/shared/schemas/user.schema';
import { CustomerDocument, CustomerSchema } from '@app/shared/schemas/customer.schema';
import { MongoRepository } from '@app/database/repository/mongo.repository';
import { DatabaseModule } from '@app/database';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessManagementController } from './access_management.controller';
import { AccessManagementService } from './access_management.service';
import { VerifyUserService } from './verify_user.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Customer', schema: CustomerSchema },
    ]),
  ],
  controllers: [AccessManagementController],
  providers: [
    {
      provide: 'UserRepository',
      useFactory: (model: Model<UserDocument>) => new MongoRepository(model),
      inject: [getModelToken('User')],
    },
    {
      provide: 'CustomerRepository',
      useFactory: (model: Model<CustomerDocument>) => new MongoRepository(model),
      inject: [getModelToken('Customer')],
    },
    AccessManagementService,
    VerifyUserService,
  ],
  exports: ['UserRepository'],
})
export class AccessManagementModule {}
