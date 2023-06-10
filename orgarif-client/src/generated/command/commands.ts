import { LocalDate } from '../../domain/datetime';
import { UserId } from '../domain/fmk-ids';
import {
  DeliberationId,
  DepartementId,
  DesignationId,
  InstanceId,
  LienDeliberationId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentantId,
  SecteurId,
  TypeStructureId
} from '../domain/ids';
import { DesignationType, ItemStatus } from '../domain/organisme';
import { PlainStringPassword } from '../domain/security';
import { LoginResult, RegisterResult, Role, UserInfos } from '../domain/user';

export type Command =
  | AddDesignationCommand
  | AddInstanceCommand
  | AddLienDeliberationCommand
  | AdminUpdatePasswordCommand
  | AdminUpdateRolesCommand
  | CreateDeliberationCommand
  | CreateDepartementCommand
  | CreateNatureJuridiqueCommand
  | CreateOrganismeCommand
  | CreateRepresentantCommand
  | CreateSecteurCommand
  | CreateTypeStructureCommand
  | DevLoginCommand
  | LoginCommand
  | RegisterCommand
  | UpdateDepartementCommand
  | UpdateDepartementStatusCommand
  | UpdateDesignationDatesCommand
  | UpdateDesignationStatusCommand
  | UpdateInstanceNomCommand
  | UpdateInstanceNombreRepresentantsCommand
  | UpdateInstancePresenceSuppleantsCommand
  | UpdateInstanceStatusCommand
  | UpdateLienDeliberationCommentCommand
  | UpdateLienDeliberationStatusCommand
  | UpdateNatureJuridiqueLibelleCommand
  | UpdateNatureJuridiqueStatusCommand
  | UpdateOrganismeDepartementCommand
  | UpdateOrganismeNatureJuridiqueCommand
  | UpdateOrganismeNomCommand
  | UpdateOrganismeNombreRepresentantsCommand
  | UpdateOrganismePresenceSuppleantsCommand
  | UpdateOrganismeSecteurCommand
  | UpdateOrganismeStatusCommand
  | UpdateOrganismeTypeStructureCommand
  | UpdatePasswordCommand
  | UpdateSecteurLibelleCommand
  | UpdateSecteurStatusCommand
  | UpdateTypeStructureLibelleCommand
  | UpdateTypeStructureStatusCommand;

export type CommandResponse =
  | AddDesignationCommandResponse
  | AddInstanceCommandResponse
  | AddLienDeliberationCommandResponse
  | CreateDeliberationCommandResponse
  | CreateDepartementCommandResponse
  | CreateNatureJuridiqueCommandResponse
  | CreateOrganismeCommandResponse
  | CreateRepresentantCommandResponse
  | CreateSecteurCommandResponse
  | CreateTypeStructureCommandResponse
  | DevLoginCommandResponse
  | EmptyCommandResponse
  | LoginCommandResponse
  | RegisterCommandResponse;

export interface EmptyCommandResponse {
  objectType: 'EmptyCommandResponse';
}

export interface AddDesignationCommand {
  objectType: 'AddDesignationCommand';
  representantId: RepresentantId;
  type: DesignationType;
  position: number;
  startDate?: LocalDate;
  organismeId: OrganismeId;
  instanceId?: InstanceId;
}

export interface AddDesignationCommandResponse {
  objectType: 'AddDesignationCommandResponse';
  id: DesignationId;
}

export interface AddInstanceCommand {
  objectType: 'AddInstanceCommand';
  nomInstance: string;
  organismeId: OrganismeId;
}

export interface AddInstanceCommandResponse {
  objectType: 'AddInstanceCommandResponse';
  id: InstanceId;
}

export interface AddLienDeliberationCommand {
  objectType: 'AddLienDeliberationCommand';
  deliberationId: DeliberationId;
  organismeId: OrganismeId;
  instanceId?: InstanceId;
  comment?: string;
}

export interface AddLienDeliberationCommandResponse {
  objectType: 'AddLienDeliberationCommandResponse';
  lienDeliberationId: LienDeliberationId;
}

export interface AdminUpdatePasswordCommand {
  objectType: 'AdminUpdatePasswordCommand';
  userId: UserId;
  password: PlainStringPassword;
}

export interface AdminUpdateRolesCommand {
  objectType: 'AdminUpdateRolesCommand';
  userId: UserId;
  roles: Role[];
}

export interface CreateDeliberationCommand {
  objectType: 'CreateDeliberationCommand';
  libelle: string;
  deliberationDate: LocalDate;
}

export interface CreateDeliberationCommandResponse {
  objectType: 'CreateDeliberationCommandResponse';
  deliberationId: DeliberationId;
}

export interface CreateDepartementCommand {
  objectType: 'CreateDepartementCommand';
  libelle: string;
  code: string;
}

export interface CreateDepartementCommandResponse {
  objectType: 'CreateDepartementCommandResponse';
  id: DepartementId;
}

export interface CreateNatureJuridiqueCommand {
  objectType: 'CreateNatureJuridiqueCommand';
  libelle: string;
}

export interface CreateNatureJuridiqueCommandResponse {
  objectType: 'CreateNatureJuridiqueCommandResponse';
  id: NatureJuridiqueId;
}

export interface CreateOrganismeCommand {
  objectType: 'CreateOrganismeCommand';
  nom: string;
}

export interface CreateOrganismeCommandResponse {
  objectType: 'CreateOrganismeCommandResponse';
  id: OrganismeId;
}

export interface CreateRepresentantCommand {
  objectType: 'CreateRepresentantCommand';
  prenom: string;
  nom: string;
}

export interface CreateRepresentantCommandResponse {
  objectType: 'CreateRepresentantCommandResponse';
  representantId: RepresentantId;
}

export interface CreateSecteurCommand {
  objectType: 'CreateSecteurCommand';
  libelle: string;
}

export interface CreateSecteurCommandResponse {
  objectType: 'CreateSecteurCommandResponse';
  id: SecteurId;
}

export interface CreateTypeStructureCommand {
  objectType: 'CreateTypeStructureCommand';
  libelle: string;
}

export interface CreateTypeStructureCommandResponse {
  objectType: 'CreateTypeStructureCommandResponse';
  id: TypeStructureId;
}

export interface DevLoginCommand {
  objectType: 'DevLoginCommand';
  username: string;
}

export interface DevLoginCommandResponse {
  objectType: 'DevLoginCommandResponse';
  userInfos: UserInfos;
}

export interface LoginCommand {
  objectType: 'LoginCommand';
  mail: string;
  password: PlainStringPassword;
}

export interface LoginCommandResponse {
  objectType: 'LoginCommandResponse';
  result: LoginResult;
  userInfos?: UserInfos;
}

export interface RegisterCommand {
  objectType: 'RegisterCommand';
  mail: string;
  password: PlainStringPassword;
  displayName: string;
}

export interface RegisterCommandResponse {
  objectType: 'RegisterCommandResponse';
  result: RegisterResult;
  userInfos?: UserInfos;
}

export interface UpdateDepartementCommand {
  objectType: 'UpdateDepartementCommand';
  id: DepartementId;
  libelle: string;
  code: string;
}

export interface UpdateDepartementStatusCommand {
  objectType: 'UpdateDepartementStatusCommand';
  id: DepartementId;
  status: ItemStatus;
}

export interface UpdateDesignationDatesCommand {
  objectType: 'UpdateDesignationDatesCommand';
  designationId: DesignationId;
  startDate?: LocalDate;
  endDate?: LocalDate;
}

export interface UpdateDesignationStatusCommand {
  objectType: 'UpdateDesignationStatusCommand';
  id: DesignationId;
  status: ItemStatus;
}

export interface UpdateInstanceNombreRepresentantsCommand {
  objectType: 'UpdateInstanceNombreRepresentantsCommand';
  instanceId: InstanceId;
  nombre: number;
}

export interface UpdateInstanceNomCommand {
  objectType: 'UpdateInstanceNomCommand';
  id: InstanceId;
  nom: string;
}

export interface UpdateInstancePresenceSuppleantsCommand {
  objectType: 'UpdateInstancePresenceSuppleantsCommand';
  presenceSuppleants: boolean;
  instanceId: InstanceId;
}

export interface UpdateInstanceStatusCommand {
  objectType: 'UpdateInstanceStatusCommand';
  id: InstanceId;
  status: ItemStatus;
}

export interface UpdateLienDeliberationCommentCommand {
  objectType: 'UpdateLienDeliberationCommentCommand';
  id: LienDeliberationId;
  comment?: string;
}

export interface UpdateLienDeliberationStatusCommand {
  objectType: 'UpdateLienDeliberationStatusCommand';
  id: LienDeliberationId;
  status: ItemStatus;
}

export interface UpdateNatureJuridiqueLibelleCommand {
  objectType: 'UpdateNatureJuridiqueLibelleCommand';
  id: NatureJuridiqueId;
  libelle: string;
}

export interface UpdateNatureJuridiqueStatusCommand {
  objectType: 'UpdateNatureJuridiqueStatusCommand';
  id: NatureJuridiqueId;
  status: ItemStatus;
}

export interface UpdateOrganismeDepartementCommand {
  objectType: 'UpdateOrganismeDepartementCommand';
  id: OrganismeId;
  departementId?: DepartementId;
}

export interface UpdateOrganismeNatureJuridiqueCommand {
  objectType: 'UpdateOrganismeNatureJuridiqueCommand';
  id: OrganismeId;
  natureJuridiqueId?: NatureJuridiqueId;
}

export interface UpdateOrganismeNombreRepresentantsCommand {
  objectType: 'UpdateOrganismeNombreRepresentantsCommand';
  id: OrganismeId;
  nombre: number;
}

export interface UpdateOrganismeNomCommand {
  objectType: 'UpdateOrganismeNomCommand';
  id: OrganismeId;
  nom: string;
}

export interface UpdateOrganismePresenceSuppleantsCommand {
  objectType: 'UpdateOrganismePresenceSuppleantsCommand';
  presenceSuppleants: boolean;
  organismeId: OrganismeId;
}

export interface UpdateOrganismeSecteurCommand {
  objectType: 'UpdateOrganismeSecteurCommand';
  id: OrganismeId;
  secteurId?: SecteurId;
}

export interface UpdateOrganismeStatusCommand {
  objectType: 'UpdateOrganismeStatusCommand';
  id: OrganismeId;
  status: ItemStatus;
}

export interface UpdateOrganismeTypeStructureCommand {
  objectType: 'UpdateOrganismeTypeStructureCommand';
  id: OrganismeId;
  typeStructureId?: TypeStructureId;
}

export interface UpdatePasswordCommand {
  objectType: 'UpdatePasswordCommand';
  password: PlainStringPassword;
}

export interface UpdateSecteurLibelleCommand {
  objectType: 'UpdateSecteurLibelleCommand';
  id: SecteurId;
  libelle: string;
}

export interface UpdateSecteurStatusCommand {
  objectType: 'UpdateSecteurStatusCommand';
  id: SecteurId;
  status: ItemStatus;
}

export interface UpdateTypeStructureLibelleCommand {
  objectType: 'UpdateTypeStructureLibelleCommand';
  id: TypeStructureId;
  libelle: string;
}

export interface UpdateTypeStructureStatusCommand {
  objectType: 'UpdateTypeStructureStatusCommand';
  id: TypeStructureId;
  status: ItemStatus;
}
