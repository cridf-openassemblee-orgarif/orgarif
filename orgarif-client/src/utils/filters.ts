import { Category } from '../domain/category';
import { Departement } from '../generated/domain/bootstrap-data';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from '../generated/domain/ids';
import { compareByNumber, compareByString } from '../utils';
import { asNominalString } from './nominal-class';

export const sortDepartements = (d: Departement[]) =>
  d.sort(compareByNumber(i => parseInt(i.code) || 0));

export const sortCategory = <T extends Category>(c: T[]): T[] =>
  c.sort(compareByString(i => i.libelle));

export interface Filters {
  departementIds: DepartementId[];
  natureJuridiqueIds: NatureJuridiqueId[];
  secteurIds: SecteurId[];
  typeStructureIds: TypeStructureId[];
}

export const emptyFilters: Filters = {
  departementIds: [],
  natureJuridiqueIds: [],
  secteurIds: [],
  typeStructureIds: []
};

export const extractFilters = (): Filters => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return {
    departementIds:
      params
        .get('departements')
        ?.split(',')
        .map(id => asNominalString<DepartementId>(id)) ?? [],
    natureJuridiqueIds:
      params
        .get('natureJuridiques')
        ?.split(',')
        .map(id => asNominalString<NatureJuridiqueId>(id)) ?? [],
    secteurIds:
      params
        .get('secteurs')
        ?.split(',')
        .map(id => asNominalString<SecteurId>(id)) ?? [],
    typeStructureIds:
      params
        .get('typeStructures')
        ?.split(',')
        .map(id => asNominalString<TypeStructureId>(id)) ?? []
  };
};

export const filtersIsEmpty = (filters: Filters): boolean =>
  filters.departementIds.length === 0 &&
  filters.natureJuridiqueIds.length === 0 &&
  filters.secteurIds.length === 0 &&
  filters.typeStructureIds.length === 0;
