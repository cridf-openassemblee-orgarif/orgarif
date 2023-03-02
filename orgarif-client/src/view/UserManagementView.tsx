/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { MainContainer } from '../container/MainContainer';
import { UserManagementRoute, useRouteParams } from '../routing/routes';
import { asString } from '../utils/nominal-class';

export const UserManagementView = () => {
  const routeParams = useRouteParams<UserManagementRoute>();
  return (
    <MainContainer>
      <h1>Users management</h1>
      <h2>User {asString(routeParams.userId)}</h2>
    </MainContainer>
  );
};
