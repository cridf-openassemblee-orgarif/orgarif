import { appContext } from '../ApplicationContext';
import {
  AddDesignationCommand,
  AddDesignationCommandResponse,
  AddInstanceCommand,
  AddInstanceCommandResponse,
  AddLienDeliberationCommand,
  AddLienDeliberationCommandResponse,
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
  DevLoginCommand,
  DevLoginCommandResponse,
  LoginCommand,
  LoginCommandResponse,
  RegisterCommand,
  RegisterCommandResponse,
  UpdateDepartementCommand,
  UpdateDepartementStatusCommand,
  UpdateDesignationDatesCommand,
  UpdateDesignationStatusCommand,
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
  UpdateSecteurLibelleCommand,
  UpdateSecteurStatusCommand,
  UpdateTypeStructureLibelleCommand,
  UpdateTypeStructureStatusCommand
} from '../domain/commands';

export class CommandService {
  public addDesignationCommand = (
    command: AddDesignationCommand
  ): Promise<AddDesignationCommandResponse> =>
    this.command('AddDesignationCommand', command);

  public addInstanceCommand = (
    command: AddInstanceCommand
  ): Promise<AddInstanceCommandResponse> =>
    this.command('AddInstanceCommand', command);

  public addLienDeliberationCommand = (
    command: AddLienDeliberationCommand
  ): Promise<AddLienDeliberationCommandResponse> =>
    this.command('AddLienDeliberationCommand', command);

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

  public updateDepartementCommand = (
    command: UpdateDepartementCommand
  ): Promise<void> => this.command('UpdateDepartementCommand', command);

  public updateDepartementStatusCommand = (
    command: UpdateDepartementStatusCommand
  ): Promise<void> => this.command('UpdateDepartementStatusCommand', command);

  public updateDesignationDatesCommand = (
    command: UpdateDesignationDatesCommand
  ): Promise<void> => this.command('UpdateDesignationDatesCommand', command);

  public updateDesignationStatusCommand = (
    command: UpdateDesignationStatusCommand
  ): Promise<void> => this.command('UpdateDesignationStatusCommand', command);

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

  public updateSecteurLibelleCommand = (
    command: UpdateSecteurLibelleCommand
  ): Promise<void> => this.command('UpdateSecteurLibelleCommand', command);

  public updateSecteurStatusCommand = (
    command: UpdateSecteurStatusCommand
  ): Promise<void> => this.command('UpdateSecteurStatusCommand', command);

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
