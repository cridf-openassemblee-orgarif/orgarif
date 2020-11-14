/** @jsx jsx */
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
import { Dict, set } from '../domain/nominal-class';
import { compareByString } from '../utils';

export const state = {
  elus: atom({
    key: 'elus',
    default: applicationBootstrapData.elus.sort(compareByString(i => i.nom))
  }),
  elusById: selector({
    key: 'elusById',
    get: ({ get }) => {
      const map: Dict<EluId, Elu> = {};
      get(state.elus).forEach(e => set(map, e.id, e));
      return map;
    }
  }),
  natureJuridiques: atom({
    key: 'natureJuridiques',
    default: applicationBootstrapData.categories.natureJuridiques.sort(
      compareByString(i => i.libelle)
    )
  }),
  natureJuridiquesById: selector({
    key: 'natureJuridiquesById',
    get: ({ get }) => {
      const map: Dict<NatureJuridiqueId, NatureJuridique> = {};
      get(state.natureJuridiques).forEach(n => set(map, n.id, n));
      return map;
    }
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
    get: ({ get }) => {
      const map: Dict<SecteurId, Secteur> = {};
      get(state.secteurs).forEach(s => set(map, s.id, s));
      return map;
    }
  }),
  typeStructures: atom({
    key: 'typeStructures',
    default: applicationBootstrapData.categories.typeStructures.sort(
      compareByString(i => i.libelle)
    )
  }),
  typeStructuresById: selector({
    key: 'typeStructuresById',
    get: ({ get }) => {
      const map: Dict<TypeStructureId, TypeStructure> = {};
      get(state.typeStructures).forEach(t => set(map, t.id, t));
      return map;
    }
  }),
  userInfos: atom({
    key: 'userState',
    default: applicationBootstrapData.userInfos
  })
};
