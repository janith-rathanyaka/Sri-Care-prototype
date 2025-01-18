import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../../chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { userId: string; agentId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const { userId, agentId } = data;

    // Join the unique room for this user-agent pair
    const roomName = `${userId}-${agentId}`;
    client.join(roomName);

    // Notify the client that they have joined the room
    client.emit('joinedRoom', `Joined room: ${roomName}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      senderId: string;
      senderRole: string;
      receiverId: string;
      message: string;
    },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { senderId, senderRole, receiverId, message } = data;

    // Save the message to the database
    const savedMessage = await this.chatService.saveMessage(
      senderId,
      senderRole,
      receiverId,
      message,
    );

    // Determine the room name
    const roomName =
      senderRole === 'user'
        ? `${senderId}-${receiverId}`
        : `${receiverId}-${senderId}`;

    // Emit the message to the room
    this.server.to(roomName).emit('receiveMessage', savedMessage);
  }
}
