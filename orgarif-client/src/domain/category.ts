import {
  Departement,
  NatureJuridique,
  Secteur,
  TypeStructure
} from '../generated/domain/BootstrapData.generated';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from '../generated/domain/Ids.generated';

export type CategoryId =
  | DepartementId
  | NatureJuridiqueId
  | SecteurId
  | TypeStructureId;

export type Category = Departement | NatureJuridique | Secteur | TypeStructure;
