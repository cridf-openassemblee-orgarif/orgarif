/** @jsx jsx */
import { css } from '@emotion/react';

// https://stackoverflow.com/questions/43186015/css-hide-scroll-bar-but-have-element-scrollable/43186311
export const cleanScrollBar = css`
  // Chrome/Safari/Webkit
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  // Firefox
  scrollbar-width: none;
  // IE 10+
  -ms-overflow-style: none;
`;
