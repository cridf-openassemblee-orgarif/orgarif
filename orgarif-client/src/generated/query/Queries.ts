import {
  DepartementId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentantId,
  SecteurId,
  TypeStructureId,
  UserId
} from '../domain/Ids';
import {
  DeliberationDto,
  OrganismeDto,
  OrganismeListDto,
  RepresentantDto
} from '../domain/Organisme';
import { UserInfos } from '../domain/User';

export type Query =
  | GetLastDeliberationsQuery
  | GetOrganismeQuery
  | GetRepresentantDetailsQuery
  | GetRepresentantsQuery
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
  | GetRepresentantDetailsQueryResponse
  | GetRepresentantsQueryResponse
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

export interface GetRepresentantDetailsQuery {
  objectType: 'GetRepresentantDetailsQuery';
  id: RepresentantId;
}

export interface GetRepresentantDetailsQueryResponse {
  objectType: 'GetRepresentantDetailsQueryResponse';
  representant: RepresentantDto;
  organismes: OrganismeListDto[];
}

export interface GetRepresentantsQuery {
  objectType: 'GetRepresentantsQuery';
}

export interface GetRepresentantsQueryResponse {
  objectType: 'GetRepresentantsQueryResponse';
  representants: RepresentantDto[];
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
