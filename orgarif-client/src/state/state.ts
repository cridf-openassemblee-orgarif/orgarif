import { CategoryId } from '../domain/category';
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
import { compareByString } from '../utils';
import { dict, Dict } from '../utils/nominal-class';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// FIXME typer pour lisibilité du state partagé...
export const state = {
  activeFilters: atom({
    key: 'activeFilters',
    default: [] as Filters[],
    effects_UNSTABLE: [persistAtom]
  }),
  countRows: atom({
    key: 'count-number-of-rows',
    default: 0
  }),
  departements: atom({
    key: 'departements',
    default: [...bootstrapData.categories.departements].sort(
      compareByString(i => i.code)
    )
  }),
  departementsById: selector({
    key: 'departementsById',
    get: ({ get }): Dict<DepartementId, Departement> =>
      dict(get(state.departements).map(n => [n.id, n]))
  }),
  enableScrollOnTable: atom({
    key: 'enable-scroll-on-table',
    default: false
  }),
  filtersExpandedAccordion: atom({
    key: 'filters-expanded-Accordion',
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
  natureJuridiques: atom({
    key: 'natureJuridiques',
    default: [...bootstrapData.categories.natureJuridiques].sort(
      compareByString(i => i.libelle)
    )
  }),
  natureJuridiquesById: selector({
    key: 'natureJuridiquesById',
    get: ({ get }): Dict<NatureJuridiqueId, NatureJuridique> =>
      dict(get(state.natureJuridiques).map(n => [n.id, n]))
  }),
  openedDrawer: atom({
    key: 'drawer',
    default: false
  }),
  organismeCategories: atom({
    key: 'organismeCategories',
    default: bootstrapData.categories
  }),
  secteurs: atom({
    key: 'secteurs',
    default: [...bootstrapData.categories.secteurs].sort(
      compareByString(i => i.libelle)
    )
  }),
  secteursById: selector({
    key: 'secteursById',
    get: ({ get }): Dict<SecteurId, Secteur> =>
      dict(get(state.secteurs).map(s => [s.id, s]))
  }),
  typeStructures: atom({
    key: 'typeStructures',
    default: [...bootstrapData.categories.typeStructures].sort(
      compareByString(i => i.libelle)
    )
  }),
  typeStructuresById: selector({
    key: 'typeStructuresById',
    get: ({ get }): Dict<TypeStructureId, TypeStructure> =>
      dict(get(state.typeStructures).map(t => [t.id, t]))
  }),
  userInfos: atom({
    key: 'userInfos',
    default: bootstrapData.userInfos
  })
};

// TODO check
// Temp types
export interface Filters {
  id: CategoryId;
  libelle: string;
}
