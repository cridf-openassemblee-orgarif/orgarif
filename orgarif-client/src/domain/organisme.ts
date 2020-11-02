import {
  NatureJuridiqueId,
  OrganismeId,
  SecteurId,
  TypeStructureId,
} from './id';
import { Instant } from './time';

export interface Organisme {
  id: OrganismeId;
  nom: string;
  secteurId?: SecteurId;
  natureJuridiqueId?: NatureJuridiqueId;
  typeStructureId?: TypeStructureId;
  nombreRepresentants?: number;
  nombreSuppleants?: number;
  partageRepresentants: boolean;
  creationDate: Instant;
  lastModificationDate: Instant;
}
