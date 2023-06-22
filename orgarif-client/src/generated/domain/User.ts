import { UserId } from './FmkIds';

export type Role = 'User' | 'Admin';

export interface UserInfos {
  id: UserId;
  mail: string;
  displayName: string;
  roles: Role[];
}

export type LoginResult = 'LoggedIn' | 'MailNotFound' | 'BadPassword';

export type RegisterResult = 'Registered' | 'MailAlreadyExists';
