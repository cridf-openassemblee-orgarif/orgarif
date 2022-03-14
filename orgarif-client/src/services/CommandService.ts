import { appContext } from '../ApplicationContext';
import {
  AddInstanceCommand,
  AddInstanceCommandResponse,
  AddLienDeliberationCommand,
  AddLienDeliberationCommandResponse,
  AddRepresentationCommand,
  AddRepresentationCommandResponse,
  AddSuppleanceCommand,
  CreateDeliberationCommand,
  CreateDeliberationCommandResponse,
  CreateDepartementCommand,
  CreateDepartementCommandResponse,
  CreateNatureJuridiqueCommand,
  CreateNatureJuridiqueCommandResponse,
  CreateOrganismeCommand,
  CreateOrganismeCommandResponse,
  CreateRepresentantCommand,
  CreateRepresentantCommandResponse,
  CreateSecteurCommand,
  CreateSecteurCommandResponse,
  CreateTypeStructureCommand,
  CreateTypeStructureCommandResponse,
  LoginCommand,
  LoginCommandResponse,
  MoveRepresentationCommand,
  RegisterCommand,
  RegisterCommandResponse,
  UpdateDepartementCommand,
  UpdateDepartementStatusCommand,
  UpdateInstanceNombreRepresentantsCommand,
  UpdateInstanceNomCommand,
  UpdateInstancePresenceSuppleantsCommand,
  UpdateInstanceStatusCommand,
  UpdateLienDeliberationCommentCommand,
  UpdateLienDeliberationStatusCommand,
  UpdateNatureJuridiqueLibelleCommand,
  UpdateNatureJuridiqueStatusCommand,
  UpdateOrganismeDepartementCommand,
  UpdateOrganismeNatureJuridiqueCommand,
  UpdateOrganismeNombreRepresentantsCommand,
  UpdateOrganismeNomCommand,
  UpdateOrganismePresenceSuppleantsCommand,
  UpdateOrganismeSecteurCommand,
  UpdateOrganismeStatusCommand,
  UpdateOrganismeTypeStructureCommand,
  UpdateRepresentationDatesCommand,
  UpdateRepresentationStatusCommand,
  UpdateSecteurLibelleCommand,
  UpdateSecteurStatusCommand,
  UpdateSuppleanceStatusCommand,
  UpdateTypeStructureLibelleCommand,
  UpdateTypeStructureStatusCommand
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

  public addRepresentationCommand = (
    command: AddRepresentationCommand
  ): Promise<AddRepresentationCommandResponse> =>
    this.command('AddRepresentationCommand', command);

  public addSuppleanceCommand = (
    command: AddSuppleanceCommand
  ): Promise<void> => this.command('AddSuppleanceCommand', command);

  public createDeliberationCommand = (
    command: CreateDeliberationCommand
  ): Promise<CreateDeliberationCommandResponse> =>
    this.command('CreateDeliberationCommand', command);

  public createDepartementCommand = (
    command: CreateDepartementCommand
  ): Promise<CreateDepartementCommandResponse> =>
    this.command('CreateDepartementCommand', command);

  public createNatureJuridiqueCommand = (
    command: CreateNatureJuridiqueCommand
  ): Promise<CreateNatureJuridiqueCommandResponse> =>
    this.command('CreateNatureJuridiqueCommand', command);

  public createOrganismeCommand = (
    command: CreateOrganismeCommand
  ): Promise<CreateOrganismeCommandResponse> =>
    this.command('CreateOrganismeCommand', command);

  public createRepresentantCommand = (
    command: CreateRepresentantCommand
  ): Promise<CreateRepresentantCommandResponse> =>
    this.command('CreateRepresentantCommand', command);

  public createSecteurCommand = (
    command: CreateSecteurCommand
  ): Promise<CreateSecteurCommandResponse> =>
    this.command('CreateSecteurCommand', command);

  public createTypeStructureCommand = (
    command: CreateTypeStructureCommand
  ): Promise<CreateTypeStructureCommandResponse> =>
    this.command('CreateTypeStructureCommand', command);

  public loginCommand = (
    command: LoginCommand
  ): Promise<LoginCommandResponse> => this.command('LoginCommand', command);

  public moveRepresentationCommand = (
    command: MoveRepresentationCommand
  ): Promise<void> => this.command('MoveRepresentationCommand', command);

  public registerCommand = (
    command: RegisterCommand
  ): Promise<RegisterCommandResponse> =>
    this.command('RegisterCommand', command);

  public updateDepartementCommand = (
    command: UpdateDepartementCommand
  ): Promise<void> => this.command('UpdateDepartementCommand', command);

  public updateDepartementStatusCommand = (
    command: UpdateDepartementStatusCommand
  ): Promise<void> => this.command('UpdateDepartementStatusCommand', command);

  public updateInstanceNombreRepresentantsCommand = (
    command: UpdateInstanceNombreRepresentantsCommand
  ): Promise<void> =>
    this.command('UpdateInstanceNombreRepresentantsCommand', command);

  public updateInstanceNomCommand = (
    command: UpdateInstanceNomCommand
  ): Promise<void> => this.command('UpdateInstanceNomCommand', command);

  public updateInstancePresenceSuppleantsCommand = (
    command: UpdateInstancePresenceSuppleantsCommand
  ): Promise<void> =>
    this.command('UpdateInstancePresenceSuppleantsCommand', command);

  public updateInstanceStatusCommand = (
    command: UpdateInstanceStatusCommand
  ): Promise<void> => this.command('UpdateInstanceStatusCommand', command);

  public updateLienDeliberationCommentCommand = (
    command: UpdateLienDeliberationCommentCommand
  ): Promise<void> =>
    this.command('UpdateLienDeliberationCommentCommand', command);

  public updateLienDeliberationStatusCommand = (
    command: UpdateLienDeliberationStatusCommand
  ): Promise<void> =>
    this.command('UpdateLienDeliberationStatusCommand', command);

  public updateNatureJuridiqueLibelleCommand = (
    command: UpdateNatureJuridiqueLibelleCommand
  ): Promise<void> =>
    this.command('UpdateNatureJuridiqueLibelleCommand', command);

  public updateNatureJuridiqueStatusCommand = (
    command: UpdateNatureJuridiqueStatusCommand
  ): Promise<void> =>
    this.command('UpdateNatureJuridiqueStatusCommand', command);

  public updateOrganismeDepartementCommand = (
    command: UpdateOrganismeDepartementCommand
  ): Promise<void> =>
    this.command('UpdateOrganismeDepartementCommand', command);

  public updateOrganismeNatureJuridiqueCommand = (
    command: UpdateOrganismeNatureJuridiqueCommand
  ): Promise<void> =>
    this.command('UpdateOrganismeNatureJuridiqueCommand', command);

  public updateOrganismeNombreRepresentantsCommand = (
    command: UpdateOrganismeNombreRepresentantsCommand
  ): Promise<void> =>
    this.command('UpdateOrganismeNombreRepresentantsCommand', command);

  public updateOrganismeNomCommand = (
    command: UpdateOrganismeNomCommand
  ): Promise<void> => this.command('UpdateOrganismeNomCommand', command);

  public updateOrganismePresenceSuppleantsCommand = (
    command: UpdateOrganismePresenceSuppleantsCommand
  ): Promise<void> =>
    this.command('UpdateOrganismePresenceSuppleantsCommand', command);

  public updateOrganismeSecteurCommand = (
    command: UpdateOrganismeSecteurCommand
  ): Promise<void> => this.command('UpdateOrganismeSecteurCommand', command);

  public updateOrganismeStatusCommand = (
    command: UpdateOrganismeStatusCommand
  ): Promise<void> => this.command('UpdateOrganismeStatusCommand', command);

  public updateOrganismeTypeStructureCommand = (
    command: UpdateOrganismeTypeStructureCommand
  ): Promise<void> =>
    this.command('UpdateOrganismeTypeStructureCommand', command);

  public updateRepresentationDatesCommand = (
    command: UpdateRepresentationDatesCommand
  ): Promise<void> => this.command('UpdateRepresentationDatesCommand', command);

  public updateRepresentationStatusCommand = (
    command: UpdateRepresentationStatusCommand
  ): Promise<void> =>
    this.command('UpdateRepresentationStatusCommand', command);

  public updateSecteurLibelleCommand = (
    command: UpdateSecteurLibelleCommand
  ): Promise<void> => this.command('UpdateSecteurLibelleCommand', command);

  public updateSecteurStatusCommand = (
    command: UpdateSecteurStatusCommand
  ): Promise<void> => this.command('UpdateSecteurStatusCommand', command);

  public updateSuppleanceStatusCommand = (
    command: UpdateSuppleanceStatusCommand
  ): Promise<void> => this.command('UpdateSuppleanceStatusCommand', command);

  public updateTypeStructureLibelleCommand = (
    command: UpdateTypeStructureLibelleCommand
  ): Promise<void> =>
    this.command('UpdateTypeStructureLibelleCommand', command);

  public updateTypeStructureStatusCommand = (
    command: UpdateTypeStructureStatusCommand
  ): Promise<void> => this.command('UpdateTypeStructureStatusCommand', command);

  private command = <R>(commandName: string, command?: object): Promise<R> =>
    appContext
      .httpService()
      .post('/command', {
        ...command,
        objectType: commandName
      })
      .then(r => r.body);
}
