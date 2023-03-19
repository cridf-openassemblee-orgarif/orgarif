/** @jsxImportSource @emotion/react */
import { Navbar } from '../common/Navbar';
import { css } from '@emotion/react';
import * as React from 'react';
import { PropsWithChildren } from 'react';

export const MainContainer = (props: PropsWithChildren) => (
  <div
    css={css`
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
    `}
  >
    <Navbar />
    <div
      css={css`
        flex: 1;
        overflow: scroll;
        padding: 10px;
      `}
    >
      {props.children}
    </div>
  </div>
);
