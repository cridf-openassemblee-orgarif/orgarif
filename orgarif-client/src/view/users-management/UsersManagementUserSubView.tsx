/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { UsersManagementUserRoute } from '../../routing/routes';

export const UsersManagementUserSubView = (props: {
  route: UsersManagementUserRoute;
}) => (
  <>
    <h2>User {props.route.userId}</h2>
  </>
);
