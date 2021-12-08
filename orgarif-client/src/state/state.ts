import { atom, selector } from 'recoil';
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
} from '../domain/ids';
import { compareByString } from '../utils';
import { dict, Dict } from '../utils/nominal-class';

export const state = {
  elus: atom<Elu[]>({
    key: 'elus',
    default: bootstrapData.elus.sort(compareByString(i => i.nom))
  }),
  elusById: selector({
    key: 'elusById',
    // TODO wtf typescript, pourquoi le return est nécessaire
    get: ({ get }): Dict<EluId, Elu> =>
      dict(get(state.elus).map(e => [e.id, e]))
  }),
  natureJuridiques: atom({
    key: 'natureJuridiques',
    default: bootstrapData.categories.natureJuridiques.sort(
      compareByString(i => i.libelle)
    )
  }),
  natureJuridiquesById: selector({
    key: 'natureJuridiquesById',
    get: ({ get }): Dict<NatureJuridiqueId, NatureJuridique> =>
      dict(get(state.natureJuridiques).map(n => [n.id, n]))
  }),
  organismeCategories: atom({
    key: 'organismeCategories',
    default: bootstrapData.categories
  }),
  secteurs: atom({
    key: 'secteurs',
    default: bootstrapData.categories.secteurs.sort(
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
    default: bootstrapData.categories.typeStructures.sort(
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
