import { EluId } from './id';
import { Instant } from './time';

export type Civilite = 'M' | 'Mme';

export interface Elu {
  id: EluId;
  civilite: Civilite;
  prenom: string;
  nom: string;
  groupePolitique: string;
  groupePolitiqueCourt: string;
  imageUrl: string;
  actif: boolean;
  creationDate: Instant;
}
