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

export interface GetOrganismeQuery {
  id: OrganismeId;
}

export interface GetOrganismeQueryResponse {
  organisme: OrganismeDto;
}

export interface IsLoginAlreadyTakenQuery {
  login: string;
}

export interface IsLoginAlreadyTakenQueryResponse {
  alreadyTaken: boolean;
}

export interface ListOrganismesByLastModifiedQuery {
  limit?: number;
}

export interface ListOrganismesByLastModifiedQueryResponse {
  organismes: OrganismeListDto[];
}

export interface ListOrganismesBySecteurQuery {
  secteurId: SecteurId;
}
export interface ListOrganismesBySecteurQueryResponse {
  organismes: OrganismeListDto[];
}

export interface ListOrganismesByIdsQuery {
  departementIds?: DepartementId[];
  natureJuridiqueIds?: NatureJuridiqueId[];
  secteurIds?: SecteurId[];
  typeStructureIds?: TypeStructureId[];
}

export interface ListOrganismesByIdsQueryResponse {
  organismes: OrganismeListDto[];
}
export interface ListOrganismesQueryResponse {
  organismes: OrganismeListDto[];
}

export interface SearchDeliberationQuery {
  searchToken: string;
}

export interface SearchDeliberationQueryResponse {
  results: DeliberationDto[];
}

export interface SearchOrganismesQuery {
  searchToken: string;
}

export interface SearchOrganismesQueryResponse {
  organismes: OrganismeListDto[];
}

export interface SearchRepresentantsQuery {
  searchToken: string;
}

export interface SearchRepresentantsQueryResponse {
  representants: RepresentantDto[];
}
