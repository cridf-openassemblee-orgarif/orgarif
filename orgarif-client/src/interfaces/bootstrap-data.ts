import { ApplicationEnvironment } from './application';
import { UserInfos } from './user';

// TODO[doc] doc fait que readonly jamais utilisé... ou l'utiliser ? à voir...
export interface ApplicationBootstrapData {
  env: ApplicationEnvironment;
  userInfos?: UserInfos;
}
