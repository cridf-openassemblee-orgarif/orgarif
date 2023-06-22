import { ClientUid } from './domain/client-ids';
import { asNominalString } from './utils/nominal-class';

export function assertUnreachable(x: never): never {
  throw new Error(`Expected unreachable code ! Value: "${JSON.stringify(x)}"`);
}

let uniqueIdIndex = 0;
export const clientUid = () =>
  asNominalString<ClientUid>('ClientUid_' + uniqueIdIndex++);

// TODO[tmpl][naming] sort in name
// usage : items.sort(compareByString(item => item.sortLabel))
export const compareByString =
  <T>(l: (o: T) => string) =>
  (o1: T, o2: T) =>
    l(o1).localeCompare(l(o2));

export const defer = (action: () => void) => setTimeout(action, 0);
