import { toast } from 'react-toastify';

export type NotificationLevel = 'warning' | 'info';

export class NotificationService {
  public notifications = [] as [
    string,
    { message: string; level: NotificationLevel }
  ][];

  public displayNotification = (
    message: string,
    level: NotificationLevel = 'info'
  ) => {
    // TODO[error]
    toast(message);
  };
}
