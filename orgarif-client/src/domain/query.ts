import { OrganismeId } from './id';
import { FullOrganisme, OrganismeInfos } from './organisme';

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

export interface ListOrganismesQueryResponse {
  organismes: OrganismeInfos[];
}
