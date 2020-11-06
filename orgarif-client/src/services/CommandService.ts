import { appContext } from '../ApplicationContext';
import {
  CreateOrganismeCommand,
  CreateOrganismeCommandResponse,
  LoginCommand,
  LoginCommandResponse,
  RegisterCommand,
  RegisterCommandResponse,
  UpdateOrganismeNatureJuridiqueCommand,
  UpdateOrganismeSecteurCommand,
  UpdateOrganismeTypeStructureCommand,
} from '../domain/command';

export class CommandService {
  public createOrganismeCommand = (
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

  public updateOrganismeNatureJuridiqueCommand = (
    command: UpdateOrganismeNatureJuridiqueCommand
  ): Promise<void> =>
    this.command('UpdateOrganismeNatureJuridiqueCommand', command);

  public updateOrganismeSecteurCommand = (
    command: UpdateOrganismeSecteurCommand
  ): Promise<void> => this.command('UpdateOrganismeSecteurCommand', command);

  public updateOrganismeTypeStructureCommand = (
    command: UpdateOrganismeTypeStructureCommand
  ): Promise<void> =>
    this.command('UpdateOrganismeTypeStructureCommand', command);

  private command = <R>(commandName: string, command?: object): Promise<R> =>
    appContext
      .httpService()
      .post('/command', {
        ...command,
        objectType: '.' + commandName,
      })
      .then((r) => r.body);
}
