import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongoRepository } from '@app/database/repository/mongo.repository';
import { DatabaseModule } from '@app/database';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp, OtpSchema } from '@app/shared/schemas/otp.schema';
import { OtpGenerateService } from './otp-generate.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }]),
  ],
  providers: [
    {
      provide: 'OtpRepository',
      useFactory: (model: Model<Otp>) => new MongoRepository(model),
      inject: [getModelToken('Otp')],
    },
    OtpGenerateService, // Add the service here
  ],
  exports: ['OtpRepository', OtpGenerateService], // Export the service
})
export class OtpGenerateModule {}
