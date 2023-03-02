/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { UsersManagementTable } from './UsersManagementTable';
import { useEffect, useState } from 'react';
import { LoadingState } from '../../interfaces';
import { UserInfos } from '../../generated/domain/user';
import { appContext } from '../../ApplicationContext';
import { GetUsersListQueryResponse } from '../../generated/query/queries';
import { MainContainer } from '../../container/MainContainer';
import { css } from '@emotion/react';

export const UsersManagementIndexSubView = () => {
  const [users, setUsers] = useState<UserInfos[]>([]);
  const [loading, setLoading] = useState<LoadingState>('idle');
  useEffect(() => {
    setLoading('loading');
    appContext
      .queryService()
      .send<GetUsersListQueryResponse>({
        objectType: 'GetUsersListQuery'
      })
      .then(r => {
        setUsers(r.users);
        setLoading('idle');
      });
  }, []);
  return <UsersManagementTable users={users} loading={loading} />;
};
