import * as breakpoint from '../components/styles/breakpoints';

export const isTabletAndMore = (): boolean => {
  if (typeof window === 'undefined' /* SSR */) {
    return false;
  } else {
    return window.matchMedia(`screen and (${breakpoint.TABLET})`).matches;
  }
};

export const isMobile = (): boolean => {
  if (typeof window === 'undefined' /* SSR */) {
    return false;
  } else {
    return window.matchMedia(`not screen and (${breakpoint.TABLET})`).matches;
  }
};
