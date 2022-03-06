import { OrganismeId, SecteurId } from './ids';
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

export interface ListOrganismesBySecteurQuery {
  secteurId: SecteurId;
}

export interface ListOrganismesBySecteurQueryResponse {
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

export interface SearchRepresentantsQuery {
  searchToken: string;
}

export interface SearchRepresentantsQueryResponse {
  representants: RepresentantDto[];
}
