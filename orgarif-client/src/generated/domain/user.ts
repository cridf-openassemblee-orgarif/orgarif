import { UserId } from './fmk-ids';

export type Role = 
 | 'user'
 | 'admin'

export interface UserInfos {
  id: UserId;
  mail: string;
  displayName: string;
  roles: Role[];
}

export type LoginResult = 
 | 'loggedIn'
 | 'mailNotFound'
 | 'badPassword'

export type RegisterResult = 
 | 'registered'
 | 'mailAlreadyExists'

