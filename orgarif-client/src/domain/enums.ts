// from https://stackoverflow.com/questions/55265679/enforce-that-an-array-is-exhaustive-over-a-union-type
import { Civility } from './user';

export const enumValues = <T extends string>() => <L extends T[]>(
  ...x: L &
    ([T] extends [L[number]] ? L : [Error, Exclude<T, L[number]>, 'is missing'])
) => x;

export const civilities = enumValues<Civility>()('MR', 'MRS');
