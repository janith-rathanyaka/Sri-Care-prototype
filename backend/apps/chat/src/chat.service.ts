import { MongoRepository } from '@app/database/repository/mongo.repository';
import { ChatMessage } from '@app/shared/schemas/chat.schema';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(  
      @Inject('ChatMessageRepository')
      private readonly chatRepository: MongoRepository<ChatMessage>
    ) {}

    async saveMessage(senderId: string, senderRole: string, receiverId: string, message: string): Promise<ChatMessage> {
      return this.chatRepository.create({ senderId, senderRole, receiverId, message });
    }
  
    async getMessages(userId: string, agentId: string): Promise<ChatMessage[]> {
      return this.chatRepository.findAll({
        $or: [
          { senderId: userId, receiverId: agentId },
          { senderId: agentId, receiverId: userId },
        ],
      });
    }
}
