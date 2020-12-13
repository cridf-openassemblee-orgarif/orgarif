/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { fonts } from './vars';

export const globalStyles = css`
  *,
  *:before,
  *:after {
    position: relative;
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    // font-size: {fonts.baseSize}px;
    font-family: ${fonts.font};
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
