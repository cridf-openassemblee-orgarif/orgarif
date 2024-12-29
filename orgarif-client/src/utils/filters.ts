import { Category } from '../domain/category';
import { Departement } from '../generated/domain/BootstrapData';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from '../generated/domain/Ids';
import { compareByNumber, compareByString } from '../utils';
import { nominal } from '../utils/nominal-class';

export const sortDepartements = (d: Departement[]) =>
  d.sort(compareByNumber(i => parseInt(i.code) || 0));

export const sortCategory = <T extends Category>(c: T[]): T[] =>
  c.sort(compareByString(i => i.libelle));

export const buildHash = (filters: Filters): string => {
  const params = new URLSearchParams();
  Object.entries(filters)
    .filter(e => e[1].length !== 0)
    .forEach(e => params.set(e[0].replace('Id', ''), e[1]));
  return params.toString();
};

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
        .map(id => nominal<DepartementId>(id)) ?? [],
    natureJuridiqueIds:
      params
        .get('natureJuridiques')
        ?.split(',')
        .map(id => nominal<NatureJuridiqueId>(id)) ?? [],
    secteurIds:
      params
        .get('secteurs')
        ?.split(',')
        .map(id => nominal<SecteurId>(id)) ?? [],
    typeStructureIds:
      params
        .get('typeStructures')
        ?.split(',')
        .map(id => nominal<TypeStructureId>(id)) ?? []
  };
};

export const filtersIsEmpty = (filters: Filters): boolean =>
  filters.departementIds.length === 0 &&
  filters.natureJuridiqueIds.length === 0 &&
  filters.secteurIds.length === 0 &&
  filters.typeStructureIds.length === 0;
