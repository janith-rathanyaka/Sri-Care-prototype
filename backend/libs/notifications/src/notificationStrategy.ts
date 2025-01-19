import { NotificationPayload } from "@app/shared/interface/notificationPayload.interface";

export interface NotificationStrategy {
    send(payload: NotificationPayload): Promise<void>;
  }
  