import { OrganismeId } from './id';
import { LoginResult, RegisterResult, UserInfos } from './user';

export interface CreateOrganismeCommand {
  nom: string;
}

export interface CreateOrganismeCommandResponse {
  id: OrganismeId;
}

export interface LoginCommand {
  login: string;
  password: string;
}

export interface LoginCommandResponse {
  result: LoginResult;
  userinfos?: UserInfos;
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
