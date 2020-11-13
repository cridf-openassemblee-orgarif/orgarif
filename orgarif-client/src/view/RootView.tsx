/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useRecoilState } from 'recoil';
import { MainContainer } from '../container/MainContainer';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';

export const RootView = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  return (
    <MainContainer>
      {!userInfos && (
        <RouteLink
          route={{
            name: 'LoginRoute',
          }}
        >
          Se connecter
        </RouteLink>
      )}
      {userInfos && (
        <RouteLink
          route={{
            name: 'ListOrganismesRoute',
          }}
        >
          Liste des organismes
        </RouteLink>
      )}
    </MainContainer>
  );
};
