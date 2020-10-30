import { Instant } from './time';

export interface IsLoginAlreadyTakenQuery {
  login: string;
}

export interface IsLoginAlreadyTakenQueryResponse {
  alreadyTaken: boolean;
}

export interface ExceptionQuery {
  i: Instant;
}
