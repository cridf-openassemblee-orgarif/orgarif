/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { asString } from '../../utils/nominal-class';
import { UsersManagementUserRoute } from '../../routing/routes';

export const UsersManagementUserSubView = (props: {
  route: UsersManagementUserRoute;
}) => (
  <>
    <h2>User {asString(props.route.userId)}</h2>
  </>
);
