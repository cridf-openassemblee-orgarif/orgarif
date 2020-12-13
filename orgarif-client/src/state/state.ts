import { atom, selector } from 'recoil';
import { applicationBootstrapData } from '../constants';
import {
  NatureJuridique,
  Secteur,
  TypeStructure
} from '../domain/bootstrap-data';
import { Elu } from '../domain/elu';
import {
  EluId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from '../domain/id';
import { compareByString } from '../utils';
import { Dict, pairsToDict } from '../utils/nominal-class';

export const state = {
  elus: atom<Elu[]>({
    key: 'elus',
    default: applicationBootstrapData.elus.sort(compareByString(i => i.nom))
  }),
  elusById: selector({
    key: 'elusById',
    // TODO wtf typescript, pourquoi le return est nécessaire
    get: ({ get }): Dict<EluId, Elu> =>
      pairsToDict(get(state.elus).map(e => [e.id, e]))
  }),
  natureJuridiques: atom({
    key: 'natureJuridiques',
    default: applicationBootstrapData.categories.natureJuridiques.sort(
      compareByString(i => i.libelle)
    )
  }),
  natureJuridiquesById: selector({
    key: 'natureJuridiquesById',
    get: ({ get }): Dict<NatureJuridiqueId, NatureJuridique> =>
      pairsToDict(get(state.natureJuridiques).map(n => [n.id, n]))
  }),
  organismeCategories: atom({
    key: 'organismeCategories',
    default: applicationBootstrapData.categories
  }),
  secteurs: atom({
    key: 'secteurs',
    default: applicationBootstrapData.categories.secteurs.sort(
      compareByString(i => i.libelle)
    )
  }),
  secteursById: selector({
    key: 'secteursById',
    get: ({ get }): Dict<SecteurId, Secteur> =>
      pairsToDict(get(state.secteurs).map(s => [s.id, s]))
  }),
  typeStructures: atom({
    key: 'typeStructures',
    default: applicationBootstrapData.categories.typeStructures.sort(
      compareByString(i => i.libelle)
    )
  }),
  typeStructuresById: selector({
    key: 'typeStructuresById',
    get: ({ get }): Dict<TypeStructureId, TypeStructure> =>
      pairsToDict(get(state.typeStructures).map(t => [t.id, t]))
  }),
  userInfos: atom({
    key: 'userInfos',
    default: applicationBootstrapData.userInfos
  })
};
