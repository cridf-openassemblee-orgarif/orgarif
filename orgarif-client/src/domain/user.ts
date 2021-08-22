import { UserId } from './ids';

export type LoginResult = 'loggedIn' | 'userNotFound' | 'badPassword';

export type RegisterResult = 'registered' | 'mailAlreadyExists';

export type Role = 'user' | 'admin';

export interface UserInfos {
  id: UserId;
  mail: string;
  displayName: string;
  // zoneId: ZoneId;
  roles: Role[];
}
