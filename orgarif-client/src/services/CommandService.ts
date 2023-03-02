import { Command, CommandResponse } from '../generated/command/commands';
import { appContext } from './ApplicationContext';

export class CommandService {
  public send = <R extends CommandResponse>(command: Command): Promise<R> =>
    appContext
      .httpService()
      .post('/command', command)
      .then(r => r.body);
}
