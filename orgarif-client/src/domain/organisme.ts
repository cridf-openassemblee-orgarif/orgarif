import {
  DeliberationId,
  DepartementId,
  DesignationId,
  InstanceId,
  LienDeliberationId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentantId,
  SecteurId,
  TypeStructureId
} from './ids';
import { LocalDate } from './time';

export type ItemStatus = 'live' | 'archive' | 'trash';

export type DesignationType = 'representant' | 'suppleant';

export interface DesignationDto {
  id: DesignationId;
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
  comment?: string;
}

export interface InstanceDto {
  id: InstanceId;
  nom: string;
  nombreRepresentants: number;
  presenceSuppleants: boolean;
  // DesignationDto | null & not undefined because of serialization
  designationRepresentants: (DesignationDto | null)[];
  designationSuppleants: (DesignationDto | null)[];
  lienDeliberations: LienDeliberationDto[];
  status: ItemStatus;
}

export interface OrganismeListDto {
  id: OrganismeId;
  nom: string;
  departementId?: DepartementId;
  natureJuridiqueId?: NatureJuridiqueId;
  secteurId?: SecteurId;
  typeStructureId?: TypeStructureId;
}

export interface OrganismeDto {
  id: OrganismeId;
  nom: string;
  departementId?: DepartementId;
  natureJuridiqueId?: NatureJuridiqueId;
  secteurId?: SecteurId;
  typeStructureId?: TypeStructureId;
  nombreRepresentants: number;
  presenceSuppleants: boolean;
  // DesignationDto | null & not undefined because of serialization
  designationRepresentants: (DesignationDto | null)[];
  designationSuppleants: (DesignationDto | null)[];
  lienDeliberations: LienDeliberationDto[];
  instances: InstanceDto[];
  status: ItemStatus;
}
