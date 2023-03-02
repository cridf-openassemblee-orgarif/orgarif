import { LoginResult, RegisterResult, UserInfos } from './user';

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
  displayName: string;
}

export interface RegisterCommandResponse {
  result: RegisterResult;
  userinfos?: UserInfos;
}
