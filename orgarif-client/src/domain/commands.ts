import {
  DeliberationId,
  EluId,
  InstanceId,
  LienDeliberationId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentantId,
  SecteurId,
  TypeStructureId
} from './ids';
import { RepresentantOrSuppleant } from './organisme';
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
  deliberationId: DeliberationId;
  organismeId: OrganismeId;
  instanceId?: InstanceId;
}

export interface AddLienDeliberationCommandResponse {
  lienDeliberationId: LienDeliberationId;
}

export interface AddRepresentantCommand {
  eluId: EluId;
  organismeId: OrganismeId;
  instanceId?: InstanceId;
  representantOrSuppleant: RepresentantOrSuppleant;
}

export interface AddRepresentantCommandResponse {
  id: RepresentantId;
}

export interface CreateDeliberationAndAddLienCommand {
  libelle: string;
  deliberationDate: LocalDate;
  organismeId: OrganismeId;
  instanceId?: InstanceId;
}

export interface CreateDeliberationAndAddLienCommandResponse {
  deliberationId: DeliberationId;
  lienDeliberationId: LienDeliberationId;
}

export interface CreateOrganismeCommand {
  nom: string;
}

export interface CreateOrganismeCommandResponse {
  id: OrganismeId;
}

export interface DeleteInstanceCommand {
  id: InstanceId;
}

export interface DeleteRepresentantCommand {
  id: RepresentantId;
}

export interface DeleteSecteurCommand {
  id: SecteurId;
}

export interface LoginCommand {
  login: string;
  password: string;
}

export interface LoginCommandResponse {
  result: LoginResult;
  userinfos?: UserInfos;
}

export interface MoveRepresentantCommand {
  id: RepresentantId;
  toOrganismeId: OrganismeId;
  toInstanceId?: InstanceId;
  toPosition: number;
  toRepresentantOrSuppleant: RepresentantOrSuppleant;
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

export interface UpdateOrganismeNatureJuridiqueCommand {
  id: OrganismeId;
  natureJuridiqueId: NatureJuridiqueId | undefined;
}

export interface UpdateOrganismePartageRepresentantsCommand {
  id: OrganismeId;
  partageRepresentants: boolean;
}

export interface UpdateOrganismeSecteurCommand {
  id: OrganismeId;
  secteurId: SecteurId | undefined;
}

export interface UpdateOrganismeTypeStructureCommand {
  id: OrganismeId;
  typeStructureId: TypeStructureId | undefined;
}

export interface UpdateSecteurLibelleCommand {
  id: SecteurId;
  libelle: string;
}
