import { appContext } from '../ApplicationContext';
import {
  LoginCommand,
  LoginCommandResponse,
  RegisterCommand,
  RegisterCommandResponse,
} from '../domain/command';

export class CommandService {
  public loginCommand = (
    command: LoginCommand
  ): Promise<LoginCommandResponse> => this.command('LoginCommand', command);

  public registerCommand = (
    command: RegisterCommand
  ): Promise<RegisterCommandResponse> =>
    this.command('RegisterCommand', command);

  public testCommand = (command: {}): Promise<void> =>
    this.command('TestCommand', command);

  private command = <R>(commandName: string, command?: object): Promise<R> =>
    appContext
      .httpService()
      .post('/command', {
        ...command,
        objectType: '.' + commandName,
      })
      .then((r) => r.body);
}
