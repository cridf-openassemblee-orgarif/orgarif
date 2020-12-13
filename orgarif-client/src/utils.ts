import { ClientUid } from './domain/client-id';
import { LocalDate } from './domain/time';
import {
  instanciateNominalString,
  stringifyNominalString
} from './utils/nominal-class';

export function assertUnreachable(x: never): never {
  throw new Error(`Expected unreachable code ! Value : "${JSON.stringify(x)}"`);
}

let uniqueIdIndex = 0;
export const clientUid = () =>
  instanciateNominalString<ClientUid>('ClientUid_' + uniqueIdIndex++);

export const getCookie = (cookieName: string) => {
  const name = cookieName + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
  }
  return undefined;
};

export const compareByNumber = <T>(l: (o: T) => number) => (o1: T, o2: T) => {
  if (l(o1) > l(o2)) return 1;
  else if (l(o1) < l(o2)) return -1;
  else return 0;
};

export const compareByString = <T>(l: (o: T) => string) => (o1: T, o2: T) =>
  l(o1).localeCompare(l(o2));

export const compareByLocalDate = <T>(l: (o: T) => LocalDate) => (
  o1: T,
  o2: T
) => stringifyNominalString(l(o1)).localeCompare(stringifyNominalString(l(o2)));

export const defer = (action: () => void) => setTimeout(action, 0);
