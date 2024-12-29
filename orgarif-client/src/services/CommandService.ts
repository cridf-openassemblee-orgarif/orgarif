import {
  Command,
  CommandResponse
} from '../generated/command/Commands.generated';
import { appContext } from './ApplicationContext';

export class CommandService {
  public send = <R extends CommandResponse>(command: Command): Promise<R> =>
    appContext.httpService.post('/command', command).then(r => {
      appContext.csrfTokenService.updateToken(r.headers);
      return r.body;
    });
}
