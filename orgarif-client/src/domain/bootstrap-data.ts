import { ApplicationEnvironment } from './application';
import { NatureJuridiqueId, SecteurId, TypeStructureId } from './ids';
import { ItemStatus } from './organisme';
import { UserInfos } from './user';

export type CategoryId = SecteurId | NatureJuridiqueId | TypeStructureId;
export type Category = Secteur | NatureJuridique | TypeStructure;

export interface Secteur {
  id: SecteurId;
  libelle: string;
  status: ItemStatus;
}

export interface NatureJuridique {
  id: NatureJuridiqueId;
  libelle: string;
  status: ItemStatus;
}

export interface TypeStructure {
  id: TypeStructureId;
  libelle: string;
  status: ItemStatus;
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
}
