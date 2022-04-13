import { CommandService } from './services/CommandService';
import { CsrfTokenService } from './services/CsrfTokenService';
import { HttpService } from './services/HttpService';
import { NotificationService } from './services/NotificationService';
import { QueryService } from './services/QueryService';

class ApplicationContext {
  private csrfTokenServiceInstance?: CsrfTokenService;
  public csrfTokenService = () => {
    if (!this.csrfTokenServiceInstance) {
      this.csrfTokenServiceInstance = new CsrfTokenService();
    }
    return this.csrfTokenServiceInstance;
  };

  private httpServiceInstance?: HttpService;
  public httpService = () => {
    if (!this.httpServiceInstance) {
      this.httpServiceInstance = new HttpService();
    }
    return this.httpServiceInstance;
  };

  private notificationServiceInstance?: NotificationService;
  public notificationService = () => {
    if (!this.notificationServiceInstance) {
      this.notificationServiceInstance = new NotificationService();
    }
    return this.notificationServiceInstance;
  };

  private queryServiceInstance?: QueryService;
  public queryService = () => {
    if (!this.queryServiceInstance) {
      this.queryServiceInstance = new QueryService();
    }
    return this.queryServiceInstance;
  };

  private commandServiceInstance?: CommandService;
  public commandService = () => {
    if (!this.commandServiceInstance) {
      this.commandServiceInstance = new CommandService();
    }
    return this.commandServiceInstance;
  };
}

export const appContext = new ApplicationContext();
