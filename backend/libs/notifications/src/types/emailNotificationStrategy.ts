import { NotificationPayload } from '@app/shared/interface/notificationPayload.interface';
import * as nodemailer from 'nodemailer';
import { NotificationStrategy } from '../notificationStrategy';

export class EmailNotificationStrategy implements NotificationStrategy {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  async send(payload: NotificationPayload): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: 'your-email@gmail.com',
        to: payload.recipient,
        subject: payload.title,
        text: payload.message,
      });
      console.log('Email notification sent');
    } catch (error) {
      console.error('Failed to send email notification:', error);
      throw error;
    }
  }
}
