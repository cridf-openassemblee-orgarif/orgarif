import { OrganismeId, SecteurId } from './ids';
import { DeliberationInfos, FullOrganisme, OrganismeInfos } from './organisme';

export interface GetOrganismeQuery {
  id: OrganismeId;
}

export interface GetOrganismeQueryResponse {
  organisme: FullOrganisme;
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
  organismes: OrganismeInfos[];
}

export interface ListOrganismesQueryResponse {
  organismes: OrganismeInfos[];
}

export interface SearchDeliberationQuery {
  searchToken: string;
}

export interface SearchDeliberationQueryResponse {
  results: DeliberationInfos[];
}
