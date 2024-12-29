import { ApplicationEnvironment } from './Application.generated';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from './Ids.generated';
import { ItemStatus } from './Organisme.generated';
import { Uri } from './Uri.generated';
import { UserInfos } from './User.generated';

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
