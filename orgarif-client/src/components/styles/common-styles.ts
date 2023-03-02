/** @jsxImportSource @emotion/react */
<<<<<<< HEAD:orgarif-client/src/styles/common-styles.ts
import { css } from '@emotion/react';
import { colors } from './colors';
import { fonts } from './fonts';
=======
import { fonts } from './vars';
import { css } from '@emotion/react';
>>>>>>> template:orgarif-client/src/components/styles/common-styles.ts

export const globalStyles = css`
  *,
  *::before,
  *::after {
    /* position: relative; */
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    font-family: ${fonts.fontFamily};
    background-color: ${colors.mainBackground};
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    /* mobile viewport bug fix */
    min-height: -webkit-fill-available;
  }

  html {
    height: -webkit-fill-available;

    /* hide scrollbar */
    scrollbar-width: none;
    ::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }

  a {
    text-decoration: none !important;
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
    margin: 10px 0;
  }
  h4 {
    font-size: 1.3rem;
    font-weight: normal;
    text-align: center;
    margin: 8px 0;
  }
`;
