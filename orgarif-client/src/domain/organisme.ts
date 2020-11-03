import {
  DeliberationId,
  EluId,
  InstanceId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentantId,
  SecteurId,
  TypeStructureId,
} from './id';
import { Instant, LocalDate } from './time';

export interface OrganismeInfos {
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

export interface InstanceInfos {
  id: InstanceId;
  nom: String;
  organismeId: OrganismeId;
  nombreRepresentants?: number;
  nombreSuppleants?: number;
}

export interface RepresentantInfos {
  id: RepresentantId;
  eluId: EluId;
  position: number;
  isSuppleant: boolean;
  creationDate: Instant;
  lastMotificationDate: Instant;
}

export interface DeliberationInfos {
  id: DeliberationId;
  libelle: string;
  deliberationDate: LocalDate;
  creationDate: Instant;
}

export interface FullInstance {
  infos: InstanceInfos;
  deliberations: DeliberationInfos[];
  representants: RepresentantInfos[];
  suppleants: RepresentantInfos[];
}

export interface FullOrganisme {
  infos: OrganismeInfos;
  deliberations: DeliberationInfos[];
  representants: RepresentantInfos[];
  suppleants: RepresentantInfos[];
  instances: FullInstance[];
}
