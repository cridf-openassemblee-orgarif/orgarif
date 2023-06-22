/** @jsxImportSource @emotion/react */
import { state } from '../../state/state';
import { MainContainer } from '../containers/MainContainer';
import { RouteLink } from '../routing/RouteLink';
import { ComponentsDemonstration } from './ComponentsDemonstration';
import { t } from './RootView.i18n';
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
          {t.Login()}
        </RouteLink>
      )}
      {userInfos && <div>{t.YouAreConnected()}</div>}
      <ComponentsDemonstration />
      <RouteLinkDemonstration />
    </MainContainer>
  );
};
