import { NominalString } from './nominal-class';

export type ClientUid = NominalString<'ClientUid'>;

export type OrgarifId =
  | DeliberationId
  | EluId
  | InstanceId
  | LienDeliberationId
  | NatureJuridiqueId
  | OrganismeId
  | RepresentantId
  | RepresentantListId
  | RequestErrorId
  | SecteurId
  | TypeStructureId
  | UserId;

export type DeliberationId = NominalString<'DeliberationId'>;
export type EluId = NominalString<'EluId'>;
export type InstanceId = NominalString<'InstanceId'>;
export type LienDeliberationId = NominalString<'LienDeliberationId'>;
export type LienDeliberationListId = NominalString<'LienDeliberationListId'>;
export type NatureJuridiqueId = NominalString<'NatureJuridiqueId'>;
export type OrganismeId = NominalString<'OrganismeId'>;
export type RepresentantId = NominalString<'RepresentantId'>;
export type RepresentantListId = NominalString<'RepresentantListId'>;
export type RequestErrorId = NominalString<'RequestErrorId'>;
export type SecteurId = NominalString<'SecteurId'>;
export type TypeStructureId = NominalString<'TypeStructureId'>;
export type UserId = NominalString<'UserId'>;
