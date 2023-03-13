/** @jsxImportSource @emotion/react */
import { fonts } from './vars';
import { css } from '@emotion/react';

export const globalStyles = css`
  html {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${fonts.font};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  button {
    outline: none !important;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: normal;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: normal;
  }
  h3 {
    font-size: 1.4rem;
    font-weight: normal;
  }
  h4 {
    font-size: 1.3rem;
    font-weight: normal;
    text-align: center;
  }
`;
