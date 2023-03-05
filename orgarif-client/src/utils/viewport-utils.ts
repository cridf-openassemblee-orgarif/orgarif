import { breakpoints } from '../components/styles/breakpoints';

export const isMobile = (): boolean => {
  if (typeof window === 'undefined' /* SSR */) {
    return false;
  } else {
    // TODO comment ça marche ?
    return window.matchMedia(`not screen and (${breakpoints.TABLET})`).matches;
  }
};
