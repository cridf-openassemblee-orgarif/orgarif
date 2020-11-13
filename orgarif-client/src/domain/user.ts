import { ZoneId } from './date';
import { UserId } from './id';

export type FilteredPdl = '************';

export type Civility = 'MR' | 'MRS';

export type LoginResult = 'LOGGED_IN' | 'USER_NOT_FOUND' | 'BAD_PASSWORD';

export type RegisterResult = 'REGISTERED' | 'MAIL_ALREADY_EXISTS';

export interface UserInfos {
  id: UserId;
  mail: string;
  zoneId: ZoneId;
  admin?: boolean;
}
