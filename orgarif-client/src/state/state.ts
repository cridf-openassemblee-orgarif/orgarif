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
import { OrganismeListDto } from '../generated/domain/organisme';
import { UserInfos } from '../generated/domain/user';
import {
  extractFilters,
  Filters,
  filtersIsEmpty,
  sortCategory,
  sortDepartements
} from '../utils/filters';
import { dict, Dict } from '../utils/nominal-class';
import { isMobile } from '../utils/viewport-utils';
import { atom, selector } from 'recoil';

// FIXME typer pour lisibilité du state partagé...
export const state = {
  categories: atom<OrganismeCategories>({
    key: 'categories',
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
  departementsById: selector<Dict<DepartementId, Departement>>({
    key: 'departementsById',
    get: ({ get }): Dict<DepartementId, Departement> =>
      dict(get(state.categories).departements.map(n => [n.id, n]))
  }),
  displayLandingPage: selector({
    key: 'displayLandingPage',
    get: ({ get }): boolean =>
      !get(state.forceListOrganisme) &&
      filtersIsEmpty(get(state.filters)) &&
      !isMobile()
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
          window.location.hash = 'test';
          window.location.hash = params.toString();
          // problem : provoques a refresh
          // if (hash === '') { window.location.href = window.location.href.split('#')[0]; }
        });
      }
    ]
  }),
  forceListOrganisme: atom<boolean>({
    key: 'forceListOrganisme',
    default: false
  }),
  natureJuridiquesById: selector<Dict<NatureJuridiqueId, NatureJuridique>>({
    key: 'natureJuridiquesById',
    get: ({ get }): Dict<NatureJuridiqueId, NatureJuridique> =>
      dict(get(state.categories).natureJuridiques.map(n => [n.id, n]))
  }),
  organismeCategories: atom<OrganismeCategories>({
    key: 'organismeCategories',
    default: bootstrapData.categories
  }),
  organismes: atom<OrganismeListDto[]>({
    key: 'organismes',
    default: []
  }),
  secteursById: selector<Dict<SecteurId, Secteur>>({
    key: 'secteursById',
    get: ({ get }): Dict<SecteurId, Secteur> =>
      dict(get(state.categories).secteurs.map(s => [s.id, s]))
  }),
  typeStructuresById: selector<Dict<TypeStructureId, TypeStructure>>({
    key: 'typeStructuresById',
    get: ({ get }): Dict<TypeStructureId, TypeStructure> =>
      dict(get(state.categories).typeStructures.map(t => [t.id, t]))
  }),
  userInfos: atom<UserInfos>({
    key: 'userInfos',
    default: bootstrapData.userInfos
  })
};
