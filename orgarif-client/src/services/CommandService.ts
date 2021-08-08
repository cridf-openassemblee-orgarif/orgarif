import { appContext } from '../ApplicationContext';
import {
  AddInstanceCommand,
  AddInstanceCommandResponse,
  AddLienDeliberationCommand,
  AddLienDeliberationCommandResponse,
  AddRepresentantCommand,
  AddRepresentantCommandResponse,
  CreateDeliberationAndAddLienCommand,
  CreateDeliberationAndAddLienCommandResponse,
  CreateOrganismeCommand,
  CreateOrganismeCommandResponse,
  DeleteInstanceCommand,
  DeleteRepresentantCommand,
  DeleteSecteurCommand,
  LoginCommand,
  LoginCommandResponse,
  MoveRepresentantCommand,
  RegisterCommand,
  RegisterCommandResponse,
  UpdateOrganismeNatureJuridiqueCommand,
  UpdateOrganismePartageRepresentantsCommand,
  UpdateOrganismeSecteurCommand,
  UpdateOrganismeTypeStructureCommand,
  UpdateSecteurLibelleCommand
} from '../domain/commands';

export class CommandService {
  public addInstanceCommand = (
    command: AddInstanceCommand
  ): Promise<AddInstanceCommandResponse> =>
    this.command('AddInstanceCommand', command);

  public addLienDeliberationCommand = (
    command: AddLienDeliberationCommand
  ): Promise<AddLienDeliberationCommandResponse> =>
    this.command('AddLienDeliberationCommand', command);

  public addRepresentantCommand = (
    command: AddRepresentantCommand
  ): Promise<AddRepresentantCommandResponse> =>
    this.command('AddRepresentantCommand', command);

  public createDeliberationAndAddLienCommand = (
    command: CreateDeliberationAndAddLienCommand
  ): Promise<CreateDeliberationAndAddLienCommandResponse> =>
    this.command('CreateDeliberationAndAddLienCommand', command);

  public createOrganismeCommand = (
    command: CreateOrganismeCommand
  ): Promise<CreateOrganismeCommandResponse> =>
    this.command('CreateOrganismeCommand', command);

  public deleteInstanceCommand = (
    command: DeleteInstanceCommand
  ): Promise<void> => this.command('DeleteInstanceCommand', command);

  public deleteRepresentantCommand = (
    command: DeleteRepresentantCommand
  ): Promise<void> => this.command('DeleteRepresentantCommand', command);

  public deleteSecteurCommand = (
    command: DeleteSecteurCommand
  ): Promise<void> => this.command('DeleteSecteurCommand', command);

  public loginCommand = (
    command: LoginCommand
  ): Promise<LoginCommandResponse> => this.command('LoginCommand', command);

  public moveRepresentantCommand = (
    command: MoveRepresentantCommand
  ): Promise<MoveRepresentantCommand> =>
    this.command('MoveRepresentantCommand', command);

  public registerCommand = (
    command: RegisterCommand
  ): Promise<RegisterCommandResponse> =>
    this.command('RegisterCommand', command);

  public updateOrganismeNatureJuridiqueCommand = (
    command: UpdateOrganismeNatureJuridiqueCommand
  ): Promise<void> =>
    this.command('UpdateOrganismeNatureJuridiqueCommand', command);

  public updateOrganismePartageRepresentantsCommand = (
    command: UpdateOrganismePartageRepresentantsCommand
  ): Promise<void> =>
    this.command('UpdateOrganismePartageRepresentantsCommand', command);

  public updateOrganismeSecteurCommand = (
    command: UpdateOrganismeSecteurCommand
  ): Promise<void> => this.command('UpdateOrganismeSecteurCommand', command);

  public updateOrganismeTypeStructureCommand = (
    command: UpdateOrganismeTypeStructureCommand
  ): Promise<void> =>
    this.command('UpdateOrganismeTypeStructureCommand', command);

  public updateSecteurLibelleCommand = (
    command: UpdateSecteurLibelleCommand
  ): Promise<void> => this.command('UpdateSecteurLibelleCommand', command);

  private command = <R>(commandName: string, command?: object): Promise<R> =>
    appContext
      .httpService()
      .post('/command', {
        ...command,
        objectType: commandName
      })
      .then(r => r.body);
}
