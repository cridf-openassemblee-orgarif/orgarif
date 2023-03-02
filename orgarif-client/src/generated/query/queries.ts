import { UserId } from '../domain/fmk-ids';
import { UserInfos } from '../domain/user';

export type Query =
  | GetUserInfosQuery
  | GetUsersListQuery
  | IsMailAlreadyTakenQuery;

export type QueryResponse =
  | GetUserInfosQueryResponse
  | GetUsersListQueryResponse
  | IsMailAlreadyTakenQueryResponse;

export interface GetUserInfosQuery {
  objectType: 'GetUserInfosQuery';
  userId: UserId;
}

export interface GetUserInfosQueryResponse {
  objectType: 'GetUserInfosQueryResponse';
  userInfos?: UserInfos;
}

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
