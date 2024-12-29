import {
  Departement,
  NatureJuridique,
  OrganismeCategories,
  Secteur,
  TypeStructure
} from '../generated/domain/BootstrapData.generated';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from '../generated/domain/Ids.generated';
import { OrganismeListDto } from '../generated/domain/Organisme.generated';
import { UserInfos } from '../generated/domain/User.generated';
import { RecordUtils } from '../utils/RecordUtils';
import {
  buildHash,
  extractFilters,
  Filters,
  filtersIsEmpty,
  sortCategory,
  sortDepartements
} from '../utils/filters';
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
  departementsById: selector<Record<DepartementId, Departement>>({
    key: 'departementsById',
    get: ({ get }): Record<DepartementId, Departement> =>
      RecordUtils.fromEntries(
        get(state.categories).departements.map(n => [n.id, n])
      ) as Record<DepartementId, Departement>
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
          window.location.hash = buildHash(newFilters);
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
  natureJuridiquesById: selector<Record<NatureJuridiqueId, NatureJuridique>>({
    key: 'natureJuridiquesById',
    get: ({ get }): Record<NatureJuridiqueId, NatureJuridique> =>
      RecordUtils.fromEntries(
        get(state.categories).natureJuridiques.map(n => [n.id, n])
      ) as Record<NatureJuridiqueId, NatureJuridique>
  }),
  organismeCategories: atom<OrganismeCategories>({
    key: 'organismeCategories',
    default: bootstrapData.categories
  }),
  organismes: atom<OrganismeListDto[]>({
    key: 'organismes',
    default: []
  }),
  secteursById: selector<Record<SecteurId, Secteur>>({
    key: 'secteursById',
    get: ({ get }): Record<SecteurId, Secteur> =>
      RecordUtils.fromEntries(
        get(state.categories).secteurs.map(s => [s.id, s])
      ) as Record<SecteurId, Secteur>
  }),
  typeStructuresById: selector<Record<TypeStructureId, TypeStructure>>({
    key: 'typeStructuresById',
    get: ({ get }): Record<TypeStructureId, TypeStructure> =>
      RecordUtils.fromEntries(
        get(state.categories).typeStructures.map(t => [t.id, t])
      ) as Record<TypeStructureId, TypeStructure>
  }),
  userInfos: atom<UserInfos>({
    key: 'userInfos',
    default: bootstrapData.userInfos
  })
};
