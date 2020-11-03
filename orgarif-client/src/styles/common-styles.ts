/** @jsx jsx */
import { css } from '@emotion/core';

export const globalStyles = css`
  *,
  *:before,
  *:after {
    position: relative;
    box-sizing: border-box;
    font-family: Arial, 'sans-serif';
    font-size: 14px;
  }

  html,
  body {
    margin: 0;
  }

  button {
    outline: none !important;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: normal;
  }
  h2 {
    font-size: 1.4rem;
    font-weight: normal;
  }
  h3 {
    font-size: 1.2rem;
    font-weight: normal;
  }
  h3 {
    font-size: 1.1rem;
    font-weight: normal;
  }
`;
