import {
  DeliberationId,
  DepartementId,
  InstanceId,
  LienDeliberationId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentantId,
  RepresentationId,
  SecteurId,
  SuppleanceId,
  TypeStructureId
} from './ids';
import { ItemStatus } from './organisme';
import { LocalDate } from './time';
import { LoginResult, RegisterResult, UserInfos } from './user';

export interface AddInstanceCommand {
  nomInstance: string;
  organismeId: OrganismeId;
}

export interface AddInstanceCommandResponse {
  id: InstanceId;
}

export interface AddLienDeliberationCommand {
  organismeId: OrganismeId;
  instanceId?: InstanceId;
  deliberationId: DeliberationId;
  comment: string | undefined;
}

export interface AddLienDeliberationCommandResponse {
  lienDeliberationId: LienDeliberationId;
}

export interface AddRepresentationCommand {
  representantId: RepresentantId;
  startDate: LocalDate | undefined;
  suppleantId: RepresentantId | undefined;
  suppleantStartDate: LocalDate | undefined;
  organismeId: OrganismeId;
  instanceId?: InstanceId;
}

export interface AddRepresentationCommandResponse {
  id: RepresentationId;
}

export interface AddSuppleanceCommand {
  representationId: RepresentationId;
  suppleantId: RepresentantId;
  suppleantStartDate?: LocalDate;
}

export interface CreateDeliberationCommand {
  libelle: string;
  deliberationDate: LocalDate;
}

export interface CreateDeliberationCommandResponse {
  deliberationId: DeliberationId;
}

export interface CreateDepartementCommand {
  libelle: string;
  code: string;
}

export interface CreateDepartementCommandResponse {
  id: DepartementId;
}

export interface CreateNatureJuridiqueCommand {
  libelle: string;
}

export interface CreateNatureJuridiqueCommandResponse {
  id: NatureJuridiqueId;
}

export interface CreateOrganismeCommand {
  nom: string;
}

export interface CreateOrganismeCommandResponse {
  id: OrganismeId;
}

export interface CreateRepresentantCommand {
  prenom: string;
  nom: string;
}

export interface CreateRepresentantCommandResponse {
  representantId: RepresentantId;
}

export interface CreateSecteurCommand {
  libelle: string;
}

export interface CreateSecteurCommandResponse {
  id: SecteurId;
}

export interface CreateTypeStructureCommand {
  libelle: string;
}

export interface CreateTypeStructureCommandResponse {
  id: TypeStructureId;
}

export interface DevLoginCommand {
  username: string;
}

export interface DevLoginCommandResponse {
  userinfos: UserInfos;
}

export interface LoginCommand {
  mail: string;
  password: string;
}

export interface LoginCommandResponse {
  result: LoginResult;
  userinfos?: UserInfos;
}

export interface RegisterCommand {
  mail: string;
  password: string;
}

export interface RegisterCommandResponse {
  result: RegisterResult;
  userinfos?: UserInfos;
  displayName: string;
}

export interface UpdateDepartementCommand {
  id: DepartementId;
  libelle: string;
  code: string;
}

export interface UpdateDepartementStatusCommand {
  id: DepartementId;
  status: ItemStatus;
}

export interface UpdateInstanceNombreRepresentantsCommand {
  instanceId: InstanceId;
  nombre: number | undefined;
}

export interface UpdateInstanceNomCommand {
  id: InstanceId;
  nom: string;
}

export interface UpdateInstancePresenceSuppleantsCommand {
  presenceSuppleants: boolean;
  instanceId: InstanceId;
}

export interface UpdateInstanceStatusCommand {
  id: InstanceId;
  status: ItemStatus;
}

export interface UpdateLienDeliberationCommentCommand {
  id: LienDeliberationId;
  comment?: string;
}

export interface UpdateLienDeliberationStatusCommand {
  id: LienDeliberationId;
  status: ItemStatus;
}

export interface UpdateNatureJuridiqueLibelleCommand {
  id: NatureJuridiqueId;
  libelle: string;
}

export interface UpdateNatureJuridiqueStatusCommand {
  id: NatureJuridiqueId;
  status: ItemStatus;
}

export interface UpdateOrganismeDepartementCommand {
  id: OrganismeId;
  departementId: DepartementId | undefined;
}

export interface UpdateOrganismeNatureJuridiqueCommand {
  id: OrganismeId;
  natureJuridiqueId: NatureJuridiqueId | undefined;
}

export interface UpdateOrganismeNombreRepresentantsCommand {
  id: OrganismeId;
  nombre: number | undefined;
}

export interface UpdateOrganismeNomCommand {
  id: OrganismeId;
  nom: string;
}

export interface UpdateOrganismePresenceSuppleantsCommand {
  presenceSuppleants: boolean;
  organismeId: OrganismeId;
}

export interface UpdateOrganismeSecteurCommand {
  id: OrganismeId;
  secteurId: SecteurId | undefined;
}

export interface UpdateOrganismeStatusCommand {
  id: OrganismeId;
  status: ItemStatus;
}

export interface UpdateOrganismeStatus {
  id: OrganismeId;
  status: ItemStatus;
}

export interface UpdateOrganismeTypeStructureCommand {
  id: OrganismeId;
  typeStructureId: TypeStructureId | undefined;
}

export interface UpdateRepresentationDatesCommand {
  representationId: RepresentationId;
  representationStartDate?: LocalDate;
  suppleanceId?: SuppleanceId;
  suppleanceStartDate?: LocalDate;
}

export interface UpdateRepresentationStatusCommand {
  id: RepresentationId;
  suppleanceId?: SuppleanceId;
  status: ItemStatus;
}

export interface UpdateSecteurLibelleCommand {
  id: SecteurId;
  libelle: string;
}

export interface UpdateSecteurStatusCommand {
  id: SecteurId;
  status: ItemStatus;
}

export interface UpdateSuppleanceStatusCommand {
  id: SuppleanceId;
  status: ItemStatus;
}

export interface UpdateTypeStructureLibelleCommand {
  id: TypeStructureId;
  libelle: string;
}

export interface UpdateTypeStructureStatusCommand {
  id: TypeStructureId;
  status: ItemStatus;
}
