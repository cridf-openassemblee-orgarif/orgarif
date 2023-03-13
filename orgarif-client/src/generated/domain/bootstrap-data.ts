import { Uri } from '../utils/Uri';
import { ApplicationEnvironment } from './application';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from './ids';
import { ItemStatus } from './organisme';
import { UserInfos } from './user';

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

export interface ApplicationBootstrapData {
  env: ApplicationEnvironment;
  sigerUrl: Uri;
  userInfos?: UserInfos;
  categories: OrganismeCategories;
}
