import { ClientUid } from './domain/client-ids';
import { LocalDate } from './domain/datetime';
import { nominal } from './utils/nominal-class';

export function assertUnreachable(x: never): never {
  throw new Error(`Expected unreachable code ! Value: "${JSON.stringify(x)}"`);
}

let uniqueIdIndex = 0;
export const clientUid = () =>
  nominal<ClientUid>('ClientUid_' + uniqueIdIndex++);

export const compareByLocalDate =
  <T>(l: (o: T) => LocalDate) =>
  (o1: T, o2: T) =>
    l(o1).localeCompare(l(o2));

export const compareByNumber =
  <T>(l: (o: T) => number) =>
  (o1: T, o2: T) => {
    if (l(o1) > l(o2)) return 1;
    else if (l(o1) < l(o2)) return -1;
    else return 0;
  };

// TODO[tmpl][naming] sort in name
// usage : items.sort(compareByString(item => item.sortLabel))
export const compareByString =
  <T>(l: (o: T) => string) =>
  (o1: T, o2: T) =>
    l(o1).localeCompare(l(o2));

export const defer = (action: () => void) => setTimeout(action, 0);

export const stringToLocalDate = (value: string): LocalDate | undefined => {
  if (value === '') {
    return undefined;
  }
  return nominal(value);
};

export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);
