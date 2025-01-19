import { NotificationPayload } from "@app/shared/interface/notificationPayload.interface";
import { NotificationStrategy } from "../notificationStrategy";

export class SMSNotificationStrategy implements NotificationStrategy {
    async send(payload: NotificationPayload): Promise<void> {
      try {
        const response = await this.mockSMSGateway(payload);
        console.log('SMS notification sent:', response);
      } catch (error) {
        console.error('Failed to send SMS notification:', error);
        throw error;
      }
    }
  
    private async mockSMSGateway(payload: NotificationPayload): Promise<string> {
      return new Promise((resolve) => {
        // Simulate an asynchronous call to an SMS gateway
        setTimeout(() => {
          console.log(`Mock SMS sent to ${payload.recipient}: ${payload.message}`);
          resolve(`SMS sent successfully to ${payload.recipient}`);
        }, 500); // Simulate network latency
      });
    }
  }
  