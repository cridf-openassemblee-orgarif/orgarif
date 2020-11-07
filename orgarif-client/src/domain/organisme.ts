import {
  DeliberationId,
  EluId,
  InstanceId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentantInstanceId,
  RepresentantOrganismeId,
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

export type RepresentantId = RepresentantOrganismeId | RepresentantInstanceId;

export interface Representant<T extends RepresentantId> {
  id: T;
  eluId: EluId;
}

export interface RepresentantOrganisme
  extends Representant<RepresentantOrganismeId> {
  id: RepresentantOrganismeId;
  eluId: EluId;
}

export interface RepresentantInstance
  extends Representant<RepresentantInstanceId> {
  id: RepresentantInstanceId;
  eluId: EluId;
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
  representants: RepresentantInstance[];
  suppleants: RepresentantInstance[];
}

export interface FullOrganisme {
  infos: OrganismeInfos;
  deliberations: DeliberationInfos[];
  representants: RepresentantOrganisme[];
  suppleants: RepresentantOrganisme[];
  instances: FullInstance[];
}
