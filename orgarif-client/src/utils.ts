import { ClientUid } from './domain/client-ids';
<<<<<<< HEAD
import { LocalDate } from './domain/time';
import { asString, instanciateNominalString } from './utils/nominal-class';
=======
import { asNominalString } from './utils/nominal-class';
>>>>>>> template

export const extractEmotionCss = (props: any) =>
  'className' in props ? { className: props['className'] } : {};

export function assertUnreachable(x: never): never {
  throw new Error(`Expected unreachable code ! Value: "${JSON.stringify(x)}"`);
}

let uniqueIdIndex = 0;
export const clientUid = () =>
  asNominalString<ClientUid>('ClientUid_' + uniqueIdIndex++);

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

<<<<<<< HEAD
export const compareByLocalDate =
  <T>(l: (o: T) => LocalDate) =>
  (o1: T, o2: T) =>
    asString(l(o1)).localeCompare(asString(l(o2)));

export const compareByNumber =
  <T>(l: (o: T) => number) =>
  (o1: T, o2: T) => {
    if (l(o1) > l(o2)) return 1;
    else if (l(o1) < l(o2)) return -1;
    else return 0;
  };

// TODO[naming] sort in name
// usage : item.sort(compareByString(item => item.sortLabel))
=======
// TODO[tmpl][naming] sort in name
// usage : items.sort(compareByString(item => item.sortLabel))
>>>>>>> template
export const compareByString =
  <T>(l: (o: T) => string) =>
  (o1: T, o2: T) =>
    l(o1).localeCompare(l(o2));

export const defer = (action: () => void) => setTimeout(action, 0);

export const stringToLocalDate = (value: string): LocalDate | undefined => {
  if (value === '') {
    return undefined;
  }
  return instanciateNominalString(value);
};

export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);
