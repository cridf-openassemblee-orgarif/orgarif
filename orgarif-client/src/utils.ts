import { ClientUid } from './domain/id';
import { instanciateNominalString } from './domain/nominal-class';

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