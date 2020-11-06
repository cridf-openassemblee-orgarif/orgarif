/** @jsx jsx */
import { atom, selector } from 'recoil';
import { applicationBootstrapData } from '../constants';
import {
  NatureJuridique,
  Secteur,
  TypeStructure,
} from '../domain/bootstrap-data';
import { NatureJuridiqueId, SecteurId, TypeStructureId } from '../domain/id';
import { set } from '../domain/nominal-class';
import { Dict } from '../interfaces';
import { compareByString } from '../utils';

export const state = {
  elus: atom({
    key: 'elus',
    default: applicationBootstrapData.elus,
  }),
  natureJuridiques: atom({
    key: 'natureJuridiques',
    default: applicationBootstrapData.categories.natureJuridiques.sort(
      compareByString((i) => i.libelle)
    ),
  }),
  natureJuridiquesById: selector({
    key: 'natureJuridiquesById',
    get: ({ get }) => {
      const map: Dict<NatureJuridiqueId, NatureJuridique> = {};
      get(state.natureJuridiques).forEach((n) => set(map, n.id, n));
      return map;
    },
  }),
  organismeCategories: atom({
    key: 'organismeCategories',
    default: applicationBootstrapData.categories,
  }),
  secteurs: atom({
    key: 'secteurs',
    default: applicationBootstrapData.categories.secteurs.sort(
      compareByString((i) => i.libelle)
    ),
  }),
  secteursById: selector({
    key: 'secteursById',
    get: ({ get }) => {
      const map: Dict<SecteurId, Secteur> = {};
      get(state.secteurs).forEach((s) => set(map, s.id, s));
      return map;
    },
  }),
  typeStructures: atom({
    key: 'typeStructures',
    default: applicationBootstrapData.categories.typeStructures.sort(
      compareByString((i) => i.libelle)
    ),
  }),
  typeStructuresById: selector({
    key: 'typeStructuresById',
    get: ({ get }) => {
      const map: Dict<TypeStructureId, TypeStructure> = {};
      get(state.typeStructures).forEach((t) => set(map, t.id, t));
      return map;
    },
  }),
  userInfos: atom({
    key: 'userState',
    default: applicationBootstrapData.userInfos,
  }),
};
