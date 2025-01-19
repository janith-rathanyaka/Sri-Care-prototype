import * as admin from 'firebase-admin';
import { NotificationStrategy } from '../notificationStrategy';
import { NotificationPayload } from '@app/shared/interface/notificationPayload.interface';

export class FirebaseNotificationStrategy implements NotificationStrategy {
  async send(payload: NotificationPayload): Promise<void> {
    try {
      await admin.messaging().send({
        token: payload.recipient, // FCM device token
        notification: {
          title: payload.title,
          body: payload.message,
        },
      });
      console.log('Push notification sent via FCM');
    } catch (error) {
      console.error('Failed to send push notification via FCM:', error);
      throw error;
    }
  }
}
