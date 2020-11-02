/** @jsx jsx */
import { jsx } from '@emotion/core';
import { MainContainer } from '../container/MainContainer';
import { RouteLink } from '../routing/RouteLink';

export const RootView = () => {
  return (
    <MainContainer>
      <div>Root view</div>
      <RouteLink
        route={{
          name: 'ListOrganismesRoute',
        }}
      >
        Organismes list
      </RouteLink>
    </MainContainer>
  );
};
