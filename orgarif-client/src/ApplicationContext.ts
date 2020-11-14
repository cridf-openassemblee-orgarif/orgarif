import { ApplicationHistory } from './routing/ApplicationHistory';
import { CommandService } from './services/CommandService';
import { CsrfTokenService } from './services/CsrfTokenService';
import { HttpService } from './services/HttpService';
import { NotificationService } from './services/NotificationService';
import { QueryService } from './services/QueryService';

class ApplicationContext {
  private csrfTokenServiceInstance: CsrfTokenService | undefined;
  public csrfTokenService = () => {
    if (!this.csrfTokenServiceInstance) {
      this.csrfTokenServiceInstance = new CsrfTokenService();
    }
    return this.csrfTokenServiceInstance;
  };

  private httpServiceInstance: HttpService | undefined;
  public httpService = () => {
    if (!this.httpServiceInstance) {
      this.httpServiceInstance = new HttpService();
    }
    return this.httpServiceInstance;
  };

  private notificationServiceInstance: NotificationService | undefined;
  public notificationService = () => {
    if (!this.notificationServiceInstance) {
      this.notificationServiceInstance = new NotificationService();
    }
    return this.notificationServiceInstance;
  };

  private applicationHistoryInstance: ApplicationHistory | undefined;
  public applicationHistory = () => {
    if (!this.applicationHistoryInstance) {
      this.applicationHistoryInstance = new ApplicationHistory();
    }
    return this.applicationHistoryInstance;
  };

  private queryServiceInstance: QueryService | undefined;
  public queryService = () => {
    if (!this.queryServiceInstance) {
      this.queryServiceInstance = new QueryService();
    }
    return this.queryServiceInstance;
  };

  private commandServiceInstance: CommandService | undefined;
  public commandService = () => {
    if (!this.commandServiceInstance) {
      this.commandServiceInstance = new CommandService();
    }
    return this.commandServiceInstance;
  };
}

export const appContext = new ApplicationContext();
