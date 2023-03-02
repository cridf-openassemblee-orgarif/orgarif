/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { MainContainer } from '../container/MainContainer';
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';

export const UsersManagementView = () => (
  <MainContainer>
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <h1>Users management</h1>
      <Outlet />
    </div>
  </MainContainer>
);
