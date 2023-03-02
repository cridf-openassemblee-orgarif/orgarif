/** @jsxImportSource @emotion/react */
import { FiltersContainer } from '../components/containers/FiltersContainer';
import { MainContainer } from '../components/containers/MainContainer';
import { TableContainer } from '../components/containers/TableContainer';
import { Fade } from '@mui/material';
import * as React from 'react';

export const OrganismesView = () => {
  return (
    <MainContainer>
      <Fade in={true} timeout={600} mountOnEnter unmountOnExit>
        <div>
          <FiltersContainer />
          <TableContainer />
        </div>
      </Fade>
    </MainContainer>
  );
};
