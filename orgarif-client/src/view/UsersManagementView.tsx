/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { MainContainer } from '../container/MainContainer';
import { css } from '@emotion/react';
import { UserInfos } from '../generated/domain/user';
import { LoadingState } from '../interfaces';
import { appContext } from '../ApplicationContext';
import { GetUsersListQueryResponse } from '../generated/query/queries';
import { UsersManagementTable } from './users-management/UsersManagementTable';
import { useSnackbar } from 'notistack';
import { EditUserDialog } from './users-management/EditUserDialog';
import {
  UsersManagementRoute,
  UsersManagementUserRoute
} from '../routing/routes';
import { useGoTo } from '../routing/routing-utils';

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
      .send<GetUsersListQueryResponse>({
        objectType: 'GetUsersListQuery'
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
