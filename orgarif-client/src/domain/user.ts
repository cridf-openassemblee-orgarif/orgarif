export type FilteredPdl = '************';

export type Civility = 'MR' | 'MRS';

export type LoginResult =
  | 'LOGGED_IN'
  | 'USER_NOT_FOUND'
  | 'BAD_PASSWORD'
  | 'NO_PASSWORD';

export type RegisterResult = 'REGISTERED' | 'MAIL_ALREADY_EXISTS';
