import { CommandService } from './CommandService';
import { CsrfTokenService } from './CsrfTokenService';
import { HttpService } from './HttpService';
import { QueryService } from './QueryService';

class ApplicationContext {
  private _csrfTokenService?: CsrfTokenService;
  get csrfTokenService() {
    if (!this._csrfTokenService) {
      this._csrfTokenService = new CsrfTokenService();
    }
    return this._csrfTokenService;
  }

  private _httpService?: HttpService;
  get httpService() {
    if (!this._httpService) {
      this._httpService = new HttpService();
    }
    return this._httpService;
  }

  private _queryService?: QueryService;
  get queryService() {
    if (!this._queryService) {
      this._queryService = new QueryService();
    }
    return this._queryService;
  }

  private _commandService?: CommandService;
  get commandService() {
    if (!this._commandService) {
      this._commandService = new CommandService();
    }
    return this._commandService;
  }
}

export const appContext = new ApplicationContext();
