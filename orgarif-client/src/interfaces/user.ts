import { ZoneId } from '../domain/date';
import { UserId } from '../domain/id';

export interface UserInfos {
  id: UserId;
  mail: string;
  displayName: string;
  zoneId: ZoneId;
  admin?: boolean;
}
