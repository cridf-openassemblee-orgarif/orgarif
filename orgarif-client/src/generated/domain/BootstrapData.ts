import { ApplicationEnvironment } from './Application';
import { UserInfos } from './User';

export interface ApplicationBootstrapData {
  env: ApplicationEnvironment;
  userInfos?: UserInfos;
}
