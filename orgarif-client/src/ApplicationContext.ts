import { ApplicationHistory } from './routing/ApplicationHistory';
import { CommandService } from './services/CommandService';
import { CsrfTokenService } from './services/CsrfTokenService';
import { HttpService } from './services/HttpService';
import { NotificationService } from './services/NotificationService';
import { QueryService } from './services/QueryService';
import UploadService from "./services/UploadService";

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

  private applicationHistoryInstance?: ApplicationHistory;
  public applicationHistory = () => {
    if (!this.applicationHistoryInstance) {
      this.applicationHistoryInstance = new ApplicationHistory();
    }
    return this.applicationHistoryInstance;
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

    private uploadServiceInstance?: UploadService;
    public uploadService = () => {
        if (!this.uploadServiceInstance) {
            this.uploadServiceInstance = new UploadService();
        }
        return this.uploadServiceInstance;
    };
}

export const appContext = new ApplicationContext();
