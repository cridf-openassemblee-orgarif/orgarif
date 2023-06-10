/** @jsxImportSource @emotion/react */
import { UserInfos } from '../../generated/domain/user';
import { GetUsersQueryResponse } from '../../generated/query/queries';
import { LoadingState } from '../../interfaces';
import { appContext } from '../../services/ApplicationContext';
import { MainContainer } from '../containers/MainContainer';
import {
  UsersManagementRoute,
  UsersManagementUserEditRolesRoute,
  UsersManagementUserRoute
} from '../routing/routes';
import { UserDetailDialog } from './UserDetailDialog';
import { UserEditRolesDialog } from './UserEditRolesDialog';
import { UsersManagementTable } from './UsersManagementTable';
import { css } from '@emotion/react';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect, useState } from 'react';

export const UsersManagementView = (props: {
  route:
    | UsersManagementRoute
    | UsersManagementUserEditRolesRoute
    | UsersManagementUserRoute;
}) => {
  const [users, setUsers] = useState<UserInfos[]>([]);
  const [loading, setLoading] = useState<LoadingState>('Idle');
  const { enqueueSnackbar } = useSnackbar();
  // TODO would probably be better to reload data
  const updateUserInfos = (userInfos: UserInfos) =>
    setUsers([
      ...users.map(u => {
        if (u.id === userInfos.id) {
          return userInfos;
        } else {
          return u;
        }
      })
    ]);
  useEffect(() => {
    setLoading('Loading');
    appContext.queryService
      .send<GetUsersQueryResponse>({
        objectType: 'GetUsersQuery'
      })
      .then(r => {
        setUsers(r.users);
        setLoading('Idle');
      })
      .catch(() => {
        setLoading('Error');
        enqueueSnackbar('An error occured while retrieving data.', {
          variant: 'error'
        });
      });
  }, [enqueueSnackbar]);
  const displayDetailsUserId =
    props.route.name === 'UsersManagementUserRoute'
      ? props.route.userId
      : undefined;
  const displayEditRolesUserId =
    props.route.name === 'UsersManagementUserEditRolesRoute'
      ? props.route.userId
      : undefined;
  return (
    <MainContainer>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <h1>Users management</h1>
        <UsersManagementTable users={users} loading={loading} />
        <UserDetailDialog userId={displayDetailsUserId} />
        <UserEditRolesDialog
          userId={displayEditRolesUserId}
          updateUserInfos={updateUserInfos}
        />
      </div>
    </MainContainer>
  );
};
