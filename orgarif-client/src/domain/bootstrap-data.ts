import { ApplicationEnvironment } from './application';
import { UserInfos } from './user';

export interface ApplicationBootstrapData {
  env: ApplicationEnvironment;
  userInfos?: UserInfos;
}
