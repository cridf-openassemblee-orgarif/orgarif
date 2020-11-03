import { Dict } from '../interfaces';
import { ApplicationEnvironment } from './application';
import { Elu } from './elu';
import { EluId, NatureJuridiqueId, SecteurId, TypeStructureId } from './id';
import { UserInfos } from './user';

export interface OrganismeCategories {
  secteurs: Dict<SecteurId, string>;
  natureJuridiques: Dict<NatureJuridiqueId, string>;
  typeStructures: Dict<TypeStructureId, string>;
}

// TODO[doc] doc fait que readonly jamais utilisé... ou l'utiliser ? à voir...
export interface ApplicationBootstrapData {
  env: ApplicationEnvironment;
  userInfos?: UserInfos;
  categories: OrganismeCategories;
  elus: Dict<EluId, Elu>;
}
