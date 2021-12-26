import { atom, selector } from 'recoil';
import { appContext } from '../ApplicationContext';
import {
  NatureJuridique,
  Secteur,
  TypeStructure
} from '../domain/bootstrap-data';
import { NatureJuridiqueId, SecteurId, TypeStructureId } from '../domain/ids';
import { RepresentantDto } from '../domain/organisme';
import { compareByString } from '../utils';
import { dict, Dict } from '../utils/nominal-class';

// FIXME typer pour lisibilité du state partagé...
export const state = {
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
  representants: selector<RepresentantDto[]>({
    key: 'representants',
    get: async () => {
      const r = await appContext.queryService().listRepresentantsQuery();
      return r.representants;
    }
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
