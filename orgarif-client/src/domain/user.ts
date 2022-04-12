import { UserId } from './ids';

export type LoginResult = 'loggedIn' | 'mailNotFound' | 'badPassword';

export type RegisterResult = 'registered' | 'mailAlreadyExists';

export type Role = 'user' | 'admin';

export interface UserInfos {
  id: UserId;
  mail: string;
  displayName: string;
  // zoneId: ZoneId;
  roles: Role[];
}
