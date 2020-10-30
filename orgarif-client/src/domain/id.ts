import { NominalString } from './nominal-class';

export type ClientUid = NominalString<'ClientUid'>;

export type OrgarifId = RequestErrorId | UserId;

export type RequestErrorId = NominalString<'RequestErrorId'>;
export type UserId = NominalString<'UserId'>;
