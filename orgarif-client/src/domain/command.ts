import { LoginResult, RegisterResult, UserInfos } from '../domain/user';
import {
  DeliberationId,
  EluId,
  InstanceId,
  LienDeliberationId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentantId,
  SecteurId,
  TypeStructureId,
} from './id';
import { RepresentantOrSuppleant } from './organisme';
import { LocalDate } from './time';

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
}

export interface UpdateOrganismeNatureJuridiqueCommand {
  id: OrganismeId;
  natureJuridiqueId: NatureJuridiqueId;
}

export interface UpdateOrganismeSecteurCommand {
  id: OrganismeId;
  secteurId: SecteurId;
}

export interface UpdateOrganismeTypeStructureCommand {
  id: OrganismeId;
  typeStructureId: TypeStructureId;
}
