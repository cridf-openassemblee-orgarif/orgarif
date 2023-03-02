import {
  Departement,
  NatureJuridique,
  Secteur,
  TypeStructure
} from '../generated/domain/bootstrap-data';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from '../generated/domain/ids';

export type CategoryId =
  | DepartementId
  | NatureJuridiqueId
  | SecteurId
  | TypeStructureId;

export type Category = Departement | NatureJuridique | Secteur | TypeStructure;
