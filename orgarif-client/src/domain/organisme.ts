import {
  DeliberationId,
  InstanceId,
  LienDeliberationId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentantId,
  RepresentationId,
  SecteurId,
  SuppleanceId,
  TypeStructureId
} from './ids';
import { LocalDate } from './time';

export type ItemStatus = 'live' | 'archive' | 'trash';

export interface RepresentationDto {
  id: RepresentationId;
  representant: RepresentantDto;
  startDate?: LocalDate;
  endDate?: LocalDate;
  suppleance?: SuppleanceDto;
}

export interface SuppleanceDto {
  id: SuppleanceId;
  representant: RepresentantDto;
  startDate?: LocalDate;
  endDate?: LocalDate;
}

export interface RepresentantDto {
  id: RepresentantId;
  isElu: boolean;
  civilite?: string;
  prenom: string;
  nom: string;
  groupePolitique?: string;
  groupePolitiqueCourt?: string;
  imageUrl?: string;
  eluActif?: boolean;
}

export interface DeliberationDto {
  id: DeliberationId;
  libelle: string;
  deliberationDate: LocalDate;
}

export interface LienDeliberationDto {
  id: LienDeliberationId;
  deliberation: DeliberationDto;
}

export interface InstanceDto {
  id: InstanceId;
  nom: string;
  nombreRepresentants?: number;
  nombreSuppleants?: number;
  lienDeliberations: LienDeliberationDto[];
  representations: RepresentationDto[];
  status: ItemStatus;
}

export interface OrganismeListDto {
  id: OrganismeId;
  nom: string;
  secteurId?: SecteurId;
  natureJuridiqueId?: NatureJuridiqueId;
  typeStructureId?: TypeStructureId;
}

export interface OrganismeDto {
  id: OrganismeId;
  nom: string;
  secteurId?: SecteurId;
  natureJuridiqueId?: NatureJuridiqueId;
  typeStructureId?: TypeStructureId;
  nombreRepresentants?: number;
  nombreSuppleants?: number;
  representations: RepresentationDto[];
  lienDeliberations: LienDeliberationDto[];
  instances: InstanceDto[];
  status: ItemStatus;
}

export interface PartialOrganismeOrInstance {
  nombreRepresentants?: number;
  nombreSuppleants?: number;
  representations: RepresentationDto[];
  lienDeliberations: LienDeliberationDto[];
}
