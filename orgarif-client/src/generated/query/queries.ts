import { UserId } from '../domain/fmk-ids';
import { UserInfos } from '../domain/user';

export type Query = GetUserInfosQuery | GetUsersQuery | IsMailAlreadyTakenQuery;

export type QueryResponse =
  | GetUserInfosQueryResponse
  | GetUsersQueryResponse
  | IsMailAlreadyTakenQueryResponse;

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
