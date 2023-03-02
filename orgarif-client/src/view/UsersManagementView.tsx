/** @jsxImportSource @emotion/react */
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { UserInfos } from '../generated/domain/user';
import { GetUsersQueryResponse } from '../generated/query/queries';
import { LoadingState } from '../interfaces';
import {
  UsersManagementRoute,
  UsersManagementUserRoute
} from '../routing/routes';
import { useGoTo } from '../routing/routing-utils';
import { EditUserDialog } from './users-management/EditUserDialog';
import { UsersManagementTable } from './users-management/UsersManagementTable';
import { css } from '@emotion/react';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect, useState } from 'react';

export const UsersManagementView = (props: {
  route: UsersManagementRoute | UsersManagementUserRoute;
}) => {
  const [users, setUsers] = useState<UserInfos[]>([]);
  const [loading, setLoading] = useState<LoadingState>('Idle');
  const { enqueueSnackbar } = useSnackbar();
  const goTo = useGoTo();
  useEffect(() => {
    setLoading('Loading');
    appContext
      .queryService()
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
  const userId =
    props.route.name === 'UsersManagementUserRoute'
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
        <EditUserDialog
          userId={userId}
          updateUserInfos={() => {}}
          close={() => goTo({ name: 'UsersManagementRoute' })}
        />
      </div>
    </MainContainer>
  );
};
