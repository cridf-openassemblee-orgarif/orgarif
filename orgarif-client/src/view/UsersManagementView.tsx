/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { MainContainer } from '../container/MainContainer';
import { Outlet } from 'react-router-dom';

export const UsersManagementView = () => (
  <MainContainer>
    <h1>Users management</h1>
    <Outlet />
  </MainContainer>
);
