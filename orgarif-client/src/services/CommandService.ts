import { appContext } from '../ApplicationContext';
import {
  CreateOrganismeCommand,
  CreateOrganismeCommandResponse,
  LoginCommand,
  LoginCommandResponse,
  RegisterCommand,
  RegisterCommandResponse,
} from '../domain/command';

export class CommandService {
  public createOrganisme = (
    command: CreateOrganismeCommand
  ): Promise<CreateOrganismeCommandResponse> =>
    this.command('CreateOrganismeCommand', command);

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
        objectType: '.' + commandName,
      })
      .then((r) => r.body);
}
