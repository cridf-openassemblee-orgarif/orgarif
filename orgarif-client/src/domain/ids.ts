import { NominalString } from '../utils/nominal-class';

export type OrgarifId =
  | CommandLogId
  | DeliberationId
  | DeploymentLogId
  | EluId
  | InstanceId
  | LienDeliberationId
  | MailLogId
  | NatureJuridiqueId
  | OrganismeId
  | OrgarifStringId
  | OrgarifUuidId
  | RepresentantId
  | RepresentationId
  | RequestErrorId
  | SecteurId
  | SuppleanceId
  | TypeStructureId
  | UserFileId
  | UserId
  | UserSessionId;

export type BooleanAsNominalString = NominalString<'BooleanAsNominalString'>;
export type CommandLogId = NominalString<'CommandLogId'>;
export type DeliberationId = NominalString<'DeliberationId'>;
export type DeploymentLogId = NominalString<'DeploymentLogId'>;
export type EluId = NominalString<'EluId'>;
export type InstanceId = NominalString<'InstanceId'>;
export type LienDeliberationId = NominalString<'LienDeliberationId'>;
export type MailLogId = NominalString<'MailLogId'>;
export type NatureJuridiqueId = NominalString<'NatureJuridiqueId'>;
export type OrganismeId = NominalString<'OrganismeId'>;
export type OrgarifStringId = NominalString<'OrgarifStringId'>;
export type OrgarifUuidId = NominalString<'OrgarifUuidId'>;
export type RepresentantId = NominalString<'RepresentantId'>;
export type RepresentationId = NominalString<'RepresentationId'>;
export type RequestErrorId = NominalString<'RequestErrorId'>;
export type SecteurId = NominalString<'SecteurId'>;
export type SuppleanceId = NominalString<'SuppleanceId'>;
export type TypeStructureId = NominalString<'TypeStructureId'>;
export type UserFileId = NominalString<'UserFileId'>;
export type UserId = NominalString<'UserId'>;
export type UserSessionId = NominalString<'UserSessionId'>;
