import { NominalString } from '../utils/nominal-class';

export type OrgarifId =
  | CommandLogId
  | DeploymentLogId
  | MailLogId
  | OrgarifSecurityId
  | OrgarifStringId
  | OrgarifUuidId
  | RequestErrorId
  | UserFileId
  | UserId
  | UserSessionId;

export type CommandLogId = NominalString<'CommandLogId'>;
export type DeploymentLogId = NominalString<'DeploymentLogId'>;
export type MailLogId = NominalString<'MailLogId'>;
export type OrgarifSecurityId = NominalString<'OrgarifSecurityId'>;
export type OrgarifStringId = NominalString<'OrgarifStringId'>;
export type OrgarifUuidId = NominalString<'OrgarifUuidId'>;
export type RequestErrorId = NominalString<'RequestErrorId'>;
export type UserFileId = NominalString<'UserFileId'>;
export type UserId = NominalString<'UserId'>;
export type UserSessionId = NominalString<'UserSessionId'>;
