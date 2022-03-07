import { ApplicationEnvironment } from './application';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from './ids';
import { ItemStatus } from './organisme';
import { UserInfos } from './user';

export type CategoryId =
  | DepartementId
  | NatureJuridiqueId
  | SecteurId
  | TypeStructureId;
export type Category = Departement | NatureJuridique | Secteur | TypeStructure;

export interface Departement {
  id: DepartementId;
  libelle: string;
  code: string;
  status: ItemStatus;
}

export interface NatureJuridique {
  id: NatureJuridiqueId;
  libelle: string;
  status: ItemStatus;
}

export interface Secteur {
  id: SecteurId;
  libelle: string;
  status: ItemStatus;
}

export interface TypeStructure {
  id: TypeStructureId;
  libelle: string;
  status: ItemStatus;
}

export interface OrganismeCategories {
  departements: Departement[];
  natureJuridiques: NatureJuridique[];
  secteurs: Secteur[];
  typeStructures: TypeStructure[];
}

// TODO[doc] doc fait que readonly jamais utilisé... ou l'utiliser ? à voir...
export interface ApplicationBootstrapData {
  env: ApplicationEnvironment;
  userInfos?: UserInfos;
  categories: OrganismeCategories;
}
