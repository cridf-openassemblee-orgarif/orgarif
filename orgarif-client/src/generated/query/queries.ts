import { UserId } from '../domain/fmk-ids';
import {
  DepartementId,
  NatureJuridiqueId,
  OrganismeId,
  SecteurId,
  TypeStructureId
} from '../domain/ids';
import {
  DeliberationDto,
  OrganismeDto,
  OrganismeListDto,
  RepresentantDto
} from '../domain/organisme';
import { UserInfos } from '../domain/user';

export type Query =
  | GetLastDeliberationsQuery
  | GetOrganismeQuery
  | GetUserInfosQuery
  | GetUsersQuery
  | IsMailAlreadyTakenQuery
  | ListAllOrganismesQuery
  | ListOrganismesQuery
  | SearchDeliberationQuery
  | SearchRepresentantsQuery;

export type QueryResponse =
  | GetLastDeliberationsQueryResponse
  | GetOrganismeQueryResponse
  | GetUserInfosQueryResponse
  | GetUsersQueryResponse
  | IsMailAlreadyTakenQueryResponse
  | ListAllOrganismesQueryResponse
  | ListOrganismesQueryResponse
  | SearchDeliberationQueryResponse
  | SearchRepresentantsQueryResponse;

export interface GetLastDeliberationsQuery {
  objectType: 'GetLastDeliberationsQuery';
}

export interface GetLastDeliberationsQueryResponse {
  objectType: 'GetLastDeliberationsQueryResponse';
  results: DeliberationDto[];
}

export interface GetOrganismeQuery {
  objectType: 'GetOrganismeQuery';
  id: OrganismeId;
}

export interface GetOrganismeQueryResponse {
  objectType: 'GetOrganismeQueryResponse';
  organisme: OrganismeDto;
}

export interface GetUserInfosQuery {
  objectType: 'GetUserInfosQuery';
  userId: UserId;
}

export interface GetUserInfosQueryResponse {
  objectType: 'GetUserInfosQueryResponse';
  userInfos?: UserInfos;
}

export interface GetUsersQuery {
  objectType: 'GetUsersQuery';
}

export interface GetUsersQueryResponse {
  objectType: 'GetUsersQueryResponse';
  users: UserInfos[];
}

export interface IsMailAlreadyTakenQuery {
  objectType: 'IsMailAlreadyTakenQuery';
  mail: string;
}

export interface IsMailAlreadyTakenQueryResponse {
  objectType: 'IsMailAlreadyTakenQueryResponse';
  alreadyTaken: boolean;
}

export interface ListAllOrganismesQuery {
  objectType: 'ListAllOrganismesQuery';
}

export interface ListAllOrganismesQueryResponse {
  objectType: 'ListAllOrganismesQueryResponse';
  organismes: OrganismeListDto[];
}

export interface ListOrganismesQuery {
  objectType: 'ListOrganismesQuery';
  departementIds: DepartementId[];
  natureJuridiqueIds: NatureJuridiqueId[];
  secteurIds: SecteurId[];
  typeStructureIds: TypeStructureId[];
  searchLabel?: string;
  itemsNumber: number;
  offset: number;
}

export interface ListOrganismesQueryResponse {
  objectType: 'ListOrganismesQueryResponse';
  organismes: OrganismeListDto[];
  totalNumber: number;
}

export interface SearchDeliberationQuery {
  objectType: 'SearchDeliberationQuery';
  searchToken: string;
}

export interface SearchDeliberationQueryResponse {
  objectType: 'SearchDeliberationQueryResponse';
  results: DeliberationDto[];
}

export interface SearchRepresentantsQuery {
  objectType: 'SearchRepresentantsQuery';
  searchToken: string;
}

export interface SearchRepresentantsQueryResponse {
  objectType: 'SearchRepresentantsQueryResponse';
  representants: RepresentantDto[];
}
