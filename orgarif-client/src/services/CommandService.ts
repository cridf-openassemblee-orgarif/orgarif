import { appContext } from '../ApplicationContext';
import {
  DevLoginCommand,
  DevLoginCommandResponse,
  LoginCommand,
  LoginCommandResponse,
  RegisterCommand,
  RegisterCommandResponse
} from '../domain/commands';

export class CommandService {
  public devLoginCommand = (
    command: DevLoginCommand
  ): Promise<DevLoginCommandResponse> =>
    this.command('DevLoginCommand', command);

  public loginCommand = (
    command: LoginCommand
  ): Promise<LoginCommandResponse> => this.command('LoginCommand', command);

  public registerCommand = (
    command: RegisterCommand
  ): Promise<RegisterCommandResponse> =>
    this.command('RegisterCommand', command);

  private command = <R>(commandName: string, command?: object): Promise<R> =>
    appContext
      .httpService()
      .post('/command', {
        ...command,
        objectType: commandName
      })
      .then(r => r.body);
}
