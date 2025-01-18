import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat/chat/chat.gateway';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMessageSchema , ChatMessage } from '@app/shared/schemas/chat.schema';
import { MongoRepository } from '@app/database/repository/mongo.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'ChatMessage', schema: ChatMessageSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [
    {
      provide: 'ChatMessageRepository',
      useFactory: (model: Model<ChatMessage>) => new MongoRepository(model),
      inject: [getModelToken('ChatMessage')],
    },
    ChatService,
    ChatGateway,
  ],
  exports: ['ChatMessageRepository'],
})
export class ChatModule {}
