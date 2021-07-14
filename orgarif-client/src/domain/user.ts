import { ZoneId } from './date';
import { UserId } from './ids';

export type LoginResult = 'loggedIn' | 'userNotFound' | 'badPassword';

export type RegisterResult = 'registered' | 'mailAlreadyExists';

export interface UserInfos {
  id: UserId;
  mail: string;
  zoneId: ZoneId;
  admin?: boolean;
}
