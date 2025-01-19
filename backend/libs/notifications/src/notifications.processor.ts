import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailNotificationStrategy } from './types/emailNotificationStrategy';
import { SMSNotificationStrategy } from './types/smsNotificationStrategy';
import { WebPushNotificationStrategy } from './types/webPushNotificationStrategy';
import { FirebaseNotificationStrategy } from './types/firebaseNotificationStrategy';

@Processor('notifications')
export class NotificationsProcessor {
    constructor(
        private readonly emailNotificationStrategy: EmailNotificationStrategy,
        private readonly smsNotificationStrategy: SMSNotificationStrategy,
        private readonly webPushNotificationStrategy: WebPushNotificationStrategy,
        private readonly firebaseNotificationStrategy: FirebaseNotificationStrategy,
    ) {}
  @Process('email')
  handleEmail(job: Job) {
    console.log('Processing email job:', job.data);
    // Add email sending logic here
    this.emailNotificationStrategy.send(job.data);
  }

  @Process('sms')
  handleSMS(job: Job) {
    console.log('Processing SMS job:', job.data);
    // Add SMS sending logic here
    this.smsNotificationStrategy.send(job.data);
  }

  @Process('push')
  handlePush(job: Job) {
    console.log('Processing push job:', job.data);
    // Add push notification logic here
    this.webPushNotificationStrategy.send(job.data);
  }

  @Process('mobile')
  handleMobile(job: Job) {
    console.log('Processing push job:', job.data);
    // Add push notification logic here
    this.firebaseNotificationStrategy.send(job.data);
  }
}
