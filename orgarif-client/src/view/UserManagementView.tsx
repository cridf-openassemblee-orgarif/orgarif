/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { MainContainer } from '../container/MainContainer';
import { UserManagementRoute } from '../routing/routes';
import { asString } from '../utils/nominal-class';

export const UserManagementView = ({
  route
}: {
  route: UserManagementRoute;
}) => (
  <MainContainer>
    <h1>Users management</h1>
    <h2>User {asString(route.userId)}</h2>
  </MainContainer>
);
