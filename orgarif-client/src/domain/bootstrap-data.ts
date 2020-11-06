import { Dict } from '../interfaces';
import { ApplicationEnvironment } from './application';
import { Elu } from './elu';
import {
  EluId,
  NatureJuridiqueId,
  OrgarifId,
  SecteurId,
  TypeStructureId,
} from './id';
import { UserInfos } from './user';

export interface Category {
  _category: 'Secteur' | 'NatureJuridique' | 'TypeStructure';
  id: OrgarifId;
  libelle: string;
}

export interface Secteur extends Category {
  _category: 'Secteur';
  id: SecteurId;
  libelle: string;
}

export interface NatureJuridique extends Category {
  _category: 'NatureJuridique';
  id: NatureJuridiqueId;
  libelle: string;
}

export interface TypeStructure extends Category {
  _category: 'TypeStructure';
  id: TypeStructureId;
  libelle: string;
}

export interface OrganismeCategories {
  secteurs: Secteur[];
  natureJuridiques: NatureJuridique[];
  typeStructures: TypeStructure[];
}

// TODO[doc] doc fait que readonly jamais utilisé... ou l'utiliser ? à voir...
export interface ApplicationBootstrapData {
  env: ApplicationEnvironment;
  userInfos?: UserInfos;
  categories: OrganismeCategories;
  elus: Dict<EluId, Elu>;
}
