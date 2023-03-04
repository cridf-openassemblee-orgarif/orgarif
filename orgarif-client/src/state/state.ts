import {
  Departement,
  NatureJuridique,
  OrganismeCategories,
  Secteur,
  TypeStructure
} from '../generated/domain/bootstrap-data';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from '../generated/domain/ids';
import {
  extractFilters,
  Filters,
  sortCategory,
  sortDepartements
} from '../utils/filters';
import { dict, Dict } from '../utils/nominal-class';
import { atom, selector } from 'recoil';

// FIXME typer pour lisibilité du state partagé...
export const state = {
  countRows: atom<number>({
    key: 'count-number-of-rows',
    default: 0
  }),
  categories: atom<OrganismeCategories>({
    key: 'departements',
    default: {
      departements: sortDepartements([
        ...bootstrapData.categories.departements
      ]),
      natureJuridiques: sortCategory([
        ...bootstrapData.categories.natureJuridiques
      ]),
      secteurs: sortCategory([...bootstrapData.categories.secteurs]),
      typeStructures: sortCategory([...bootstrapData.categories.typeStructures])
    }
  }),
  departementsById: selector({
    key: 'departementsById',
    get: ({ get }): Dict<DepartementId, Departement> =>
      dict(get(state.categories).departements.map(n => [n.id, n]))
  }),
  enableScrollOnTable: atom<boolean>({
    key: 'enable-scroll-on-table',
    default: false
  }),
  filters: atom<Filters>({
    key: 'filters',
    default: extractFilters(),
    effects: [
      e => {
        e.onSet(newFilters => {
          const params = new URLSearchParams();
          Object.entries(newFilters)
            .filter(e => e[1].length !== 0)
            .forEach(e => params.set(e[0].replace('Id', ''), e[1]));
          window.location.hash = params.toString();
          // problem : provoques a refresh
          // if (hash === '') { window.location.href = window.location.href.split('#')[0]; }
        });
      }
    ]
  }),
  filtersExpandedAccordion: atom({
    key: 'filters-expanded-accordion',
    default: true
  }),
  filtersSectionShrinked: atom({
    key: 'filters-section-shrinked',
    default: true
  }),
  headerShrinked: atom({
    key: 'header-shrinked',
    default: false
  }),
  natureJuridiquesById: selector({
    key: 'natureJuridiquesById',
    get: ({ get }): Dict<NatureJuridiqueId, NatureJuridique> =>
      dict(get(state.categories).natureJuridiques.map(n => [n.id, n]))
  }),
  openedDrawer: atom({
    key: 'drawer',
    default: false
  }),
  organismeCategories: atom({
    key: 'organismeCategories',
    default: bootstrapData.categories
  }),
  secteursById: selector({
    key: 'secteursById',
    get: ({ get }): Dict<SecteurId, Secteur> =>
      dict(get(state.categories).secteurs.map(s => [s.id, s]))
  }),
  typeStructuresById: selector({
    key: 'typeStructuresById',
    get: ({ get }): Dict<TypeStructureId, TypeStructure> =>
      dict(get(state.categories).typeStructures.map(t => [t.id, t]))
  }),
  userInfos: atom({
    key: 'userInfos',
    default: bootstrapData.userInfos
  })
};
