import { ApplicationEnvironment } from './Application';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from './Ids';
import { ItemStatus } from './Organisme';
import { Uri } from './Uri';
import { UserInfos } from './User';

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
