import { NotificationPayload } from '@app/shared/interface/notificationPayload.interface';
import * as webPush from 'web-push';
import { NotificationStrategy } from '../notificationStrategy';

export class WebPushNotificationStrategy implements NotificationStrategy {
  async send(payload: NotificationPayload): Promise<void> {
    try {
      const subscription = JSON.parse(payload.recipient); // Web push subscription object
      await webPush.sendNotification(subscription, JSON.stringify({
        title: payload.title,
        body: payload.message,
      }));
      console.log('Web push notification sent');
    } catch (error) {
      console.error('Failed to send web push notification:', error);
      throw error;
    }
  }
}
