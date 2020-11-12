import { LoginResult, RegisterResult, UserInfos } from '../domain/user';
import {
  EluId,
  InstanceId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentantId,
  SecteurId,
  TypeStructureId,
} from './id';
import { RepresentantOrSuppleant } from './organisme';

export interface AddInstanceCommand {
  nomInstance: string;
  organismeId: OrganismeId;
}

export interface AddInstanceCommandResponse {
  id: InstanceId;
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

export interface CreateOrganismeCommand {
  nom: string;
}

export interface CreateOrganismeCommandResponse {
  id: OrganismeId;
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
  displayName: string;
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
