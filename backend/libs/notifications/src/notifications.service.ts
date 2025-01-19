import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class NotificationsService {
    constructor(@InjectQueue('notifications') private readonly notificationQueue: Queue) {}

    async sendNotification(types: ('email' | 'sms' | 'push')[], payload: any): Promise<void> {
        for (const type of types) {
            await this.notificationQueue.add(type, payload, {
              attempts: 3, // Retry failed jobs up to 3 times
              backoff: 5000, // Wait 5 seconds before retrying
            });
        }
    }    
}
