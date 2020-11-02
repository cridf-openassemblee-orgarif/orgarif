import { Organisme } from './organisme';

export interface IsLoginAlreadyTakenQuery {
  login: string;
}

export interface IsLoginAlreadyTakenQueryResponse {
  alreadyTaken: boolean;
}

export interface ListOrganismesQueryResponse {
  organismes: Organisme[];
}
