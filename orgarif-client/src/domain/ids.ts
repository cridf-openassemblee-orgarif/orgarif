// conflict : deleted in template
import { NominalString } from '../utils/nominal-class';

export type OrgarifId =
  | CommandLogId
  | DeliberationId
  | DepartementId
  | DeploymentLogId
  | DesignationId
  | EluId
  | InstanceId
  | LienDeliberationId
  | MailLogId
  | NatureJuridiqueId
  | OrganismeId
  | OrgarifStringId
  | OrgarifUuidId
  | RepresentantId
  | RequestErrorId
  | SecteurId
  | TypeStructureId
  | UserFileId
  | UserId
  | UserSessionId;

export type BooleanAsNominalString = NominalString<'BooleanAsNominalString'>;
export type CommandLogId = NominalString<'CommandLogId'>;
export type DeliberationId = NominalString<'DeliberationId'>;
export type DepartementId = NominalString<'DepartementId'>;
export type DeploymentLogId = NominalString<'DeploymentLogId'>;
export type DesignationId = NominalString<'DesignationId'>;
export type EluId = NominalString<'EluId'>;
export type InstanceId = NominalString<'InstanceId'>;
export type LienDeliberationId = NominalString<'LienDeliberationId'>;
export type MailLogId = NominalString<'MailLogId'>;
export type NatureJuridiqueId = NominalString<'NatureJuridiqueId'>;
export type OrganismeId = NominalString<'OrganismeId'>;
export type OrgarifStringId = NominalString<'OrgarifStringId'>;
export type OrgarifUuidId = NominalString<'OrgarifUuidId'>;
export type RepresentantId = NominalString<'RepresentantId'>;
export type RequestErrorId = NominalString<'RequestErrorId'>;
export type SecteurId = NominalString<'SecteurId'>;
export type TypeStructureId = NominalString<'TypeStructureId'>;
export type UserFileId = NominalString<'UserFileId'>;
export type UserId = NominalString<'UserId'>;
export type UserSessionId = NominalString<'UserSessionId'>;
