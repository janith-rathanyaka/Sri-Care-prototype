import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { BullModule } from '@nestjs/bull';
import { NotificationsProcessor } from './notifications.processor';
import { EmailNotificationStrategy } from './types/emailNotificationStrategy';
import { SMSNotificationStrategy } from './types/smsNotificationStrategy';
import { WebPushNotificationStrategy } from './types/webPushNotificationStrategy';
import { FirebaseNotificationStrategy } from './types/firebaseNotificationStrategy';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  providers: [
    NotificationsService,
    NotificationsProcessor,
    EmailNotificationStrategy,
    SMSNotificationStrategy,
    EmailNotificationStrategy,
    WebPushNotificationStrategy,
    FirebaseNotificationStrategy,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
