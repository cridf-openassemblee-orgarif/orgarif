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

export interface RepresentantOrganismeInfos {
  id: RepresentantId;
  eluId: EluId;
  organismeId: OrganismeId;
  position: number;
  isSuppleant: boolean;
  creationDate: Instant;
  lastMotificationDate: Instant;
}

export interface RepresentantInstanceInfos {
  id: RepresentantId;
  eluId: EluId;
  instanceId: InstanceId;
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
  representants: RepresentantInstanceInfos[];
  suppleants: RepresentantInstanceInfos[];
}

export interface FullOrganisme {
  infos: OrganismeInfos;
  deliberations: DeliberationInfos[];
  representants: RepresentantOrganismeInfos[];
  suppleants: RepresentantOrganismeInfos[];
  instances: FullInstance[];
}
