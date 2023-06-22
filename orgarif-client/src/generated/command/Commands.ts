import { UserId } from '../domain/Ids';
import { PlainStringPassword } from '../domain/Security';
import { LoginResult, RegisterResult, Role, UserInfos } from '../domain/User';

export type Command =
  | AdminUpdateRolesCommand
  | DevLoginCommand
  | LoginCommand
  | RegisterCommand
  | UpdatePasswordCommand;

export type CommandResponse =
  | DevLoginCommandResponse
  | EmptyCommandResponse
  | LoginCommandResponse
  | RegisterCommandResponse;

export interface EmptyCommandResponse {
  objectType: 'EmptyCommandResponse';
}

export interface AdminUpdateRolesCommand {
  objectType: 'AdminUpdateRolesCommand';
  userId: UserId;
  roles: Role[];
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

export interface UpdatePasswordCommand {
  objectType: 'UpdatePasswordCommand';
  password: PlainStringPassword;
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
