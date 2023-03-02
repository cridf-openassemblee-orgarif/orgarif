import { UserInfos } from '../domain/user';

export type Query =
  | GetUsersListQuery
  | IsMailAlreadyTakenQuery

export type QueryResponse =
  | GetUsersListQueryResponse
  | IsMailAlreadyTakenQueryResponse

export interface GetUsersListQuery {
  objectType: 'GetUsersListQuery';
}

export interface GetUsersListQueryResponse {
  objectType: 'GetUsersListQueryResponse';
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

