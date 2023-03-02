import { appContext } from '../ApplicationContext';
import { Command, CommandResponse } from '../generated/command/commands';

export class CommandService {
  public send = <R extends CommandResponse>(command: Command): Promise<R> =>
    appContext
      .httpService()
      .post('/command', command)
      .then(r => r.body);
}
