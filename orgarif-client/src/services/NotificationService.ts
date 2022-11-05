export type NotificationLevel = 'Warning' | 'Info';

export class NotificationService {
  public notifications = [] as [
    string,
    { message: string; level: NotificationLevel }
  ][];

  public displayNotification = (
    message: string,
    level: NotificationLevel = 'Info'
  ) => {
    // TODO[fmk] !
  };
}
