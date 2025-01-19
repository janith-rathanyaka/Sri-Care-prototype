export interface NotificationPayload {
    title: string;
    message: string;
    recipient: string; // Device token, email, phone number, or subscription object
    platform: 'sms' | 'email' | 'web' | 'android' | 'ios';
  }
  