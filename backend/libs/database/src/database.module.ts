import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoRepository } from './repository/mongo.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI ?? '',
      }),
    }),
  ],
  // No need to provide the repository here
  providers: [],
  // Export only MongooseModule (if you want to share the connection)
  exports: [MongooseModule],
})
export class DatabaseModule {}
