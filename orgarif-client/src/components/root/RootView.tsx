/** @jsxImportSource @emotion/react */
import { state } from '../../state/state';
import { MainContainer } from '../containers/MainContainer';
import { RouteLink } from '../routing/RouteLink';
import { ComponentsDemonstration } from './ComponentsDemonstration';
import { RouteLinkDemonstration } from './RouteLinkDemonstration';
import * as React from 'react';
import { useRecoilState } from 'recoil';

export const RootView = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  return (
    <MainContainer>
      {!userInfos && (
        <RouteLink
          route={{
            name: 'LoginRoute'
          }}
        >
          Login
        </RouteLink>
      )}
      {userInfos && <div>You're connected</div>}
      <ComponentsDemonstration />
      <RouteLinkDemonstration />
      {userInfos && userInfos.roles.includes('Admin') && (
        <RouteLink
          route={{
            name: 'UsersManagementRoute'
          }}
        >
          Users management
        </RouteLink>
      )}
    </MainContainer>
  );
};
