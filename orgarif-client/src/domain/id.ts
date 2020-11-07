import { NominalString } from './nominal-class';

export type ClientUid = NominalString<'ClientUid'>;

export type OrgarifId =
  | DeliberationId
  | EluId
  | InstanceId
  | NatureJuridiqueId
  | OrganismeDeliberationId
  | OrganismeId
  | RequestErrorId
  | SecteurId
  | TypeStructureId
  | UserId;

export type DeliberationId = NominalString<'DeliberationId'>;
export type EluId = NominalString<'EluId'>;
export type InstanceId = NominalString<'InstanceId'>;
export type NatureJuridiqueId = NominalString<'NatureJuridiqueId'>;
export type OrganismeDeliberationId = NominalString<'OrganismeDeliberationId'>;
export type OrganismeId = NominalString<'OrganismeId'>;
export type RepresentantInstanceId = NominalString<'RepresentantInstanceId'>;
export type RepresentantOrganismeId = NominalString<'RepresentantOrganismeId'>;
export type RequestErrorId = NominalString<'RequestErrorId'>;
export type SecteurId = NominalString<'SecteurId'>;
export type TypeStructureId = NominalString<'TypeStructureId'>;
export type UserId = NominalString<'UserId'>;
