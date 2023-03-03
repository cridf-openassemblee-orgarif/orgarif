/** @jsxImportSource @emotion/react */
import { MainContainer } from '../containers/MainContainer';
import { css } from '@emotion/react';
import * as React from 'react';

export const NotFoundView = () => (
  <MainContainer>
    <div
      css={css`
        height: 100vh;
        padding-top: 200px;
        text-align: center;
      `}
    >
      <h1>Page not found</h1>
    </div>
  </MainContainer>
);
