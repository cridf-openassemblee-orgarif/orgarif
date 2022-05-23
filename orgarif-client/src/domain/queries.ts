import {
  DepartementId,
  NatureJuridiqueId,
  OrganismeId,
  SecteurId,
  TypeStructureId
} from './ids';
import {
  DeliberationDto,
  OrganismeDto,
  OrganismeListDto,
  RepresentantDto
} from './organisme';
import { OrganismeOrderColumn } from './display';

export interface GetOrganismeQuery {
  id: OrganismeId;
}

export interface GetOrganismeQueryResponse {
  organisme: OrganismeDto;
}

export interface IsMailAlreadyTakenQuery {
  mail: string;
}

export interface IsMailAlreadyTakenQueryResponse {
  alreadyTaken: boolean;
}

export interface ListOrganismesQuery {
  departementIds: DepartementId[];
  natureJuridiqueIds: NatureJuridiqueId[];
  secteurIds: SecteurId[];
  typeStructureIds: TypeStructureId[];
  searchLabel?: string;
  page: number;
  itemsNumber: number;
  orderBy: OrganismeOrderColumn;
}

export interface ListOrganismesQueryResponse {
  organismes: OrganismeListDto[];
  totalNumber: number;
}

export interface SearchDeliberationQuery {
  searchToken: string;
}

export interface SearchDeliberationQueryResponse {
  results: DeliberationDto[];
}

export interface SearchRepresentantsQuery {
  searchToken: string;
}

export interface SearchRepresentantsQueryResponse {
  representants: RepresentantDto[];
}
