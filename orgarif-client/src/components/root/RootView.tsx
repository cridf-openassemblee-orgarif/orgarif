/** @jsxImportSource @emotion/react */
import { state } from '../../state/state';
import { isMobile } from '../../utils/viewport-utils';
import { DesktopFiltersContainer } from '../containers/DesktopFiltersContainer';
import { FiltersHeader } from '../containers/FiltersHeader';
import { LandingFiltersContainer } from '../containers/LandingFiltersContainer';
import { MainContainer } from '../containers/MainContainer';
import { MobileFiltersContainer } from '../containers/MobileFiltersContainer';
import { OrganismesTable } from '../containers/OrganismesTable';
import { LandingTitle } from './LandingTitle';
import { RootViewTitle } from './RootViewTitle';
import { css } from '@emotion/react';
import { Fade } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

export const RootView = () => {
  const displayLandingPage = useRecoilValue(state.displayLandingPage);
  const [displayActiveFilters, setDisplayActiveFilters] =
    useState<boolean>(false);
  return (
    <MainContainer>
      {displayLandingPage && (
        <>
          <LandingTitle />
          <LandingFiltersContainer />
        </>
      )}
      {!displayLandingPage && (
        <Fade
          in={true}
          timeout={600}
          mountOnEnter
          unmountOnExit
          appear={!isMobile()}
        >
          <div
            css={css`
              position: relative;
            `}
          >
            <RootViewTitle label="Filtres" position={0}>
              {/* Display active filters when filter section is hidden */}
              {<FiltersHeader displayActiveFilters={displayActiveFilters} />}
            </RootViewTitle>
            {isMobile() && <MobileFiltersContainer />}
            {!isMobile() && (
              <DesktopFiltersContainer
                setDisplayActiveFilters={setDisplayActiveFilters}
              />
            )}
            <RootViewTitle label="Liste des organismes" position={1} />
            {/*<TableHeader />*/}
            <OrganismesTable />
          </div>
        </Fade>
      )}
    </MainContainer>
  );
};
