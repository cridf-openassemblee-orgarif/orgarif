/** @jsxImportSource @emotion/react */
import { Fade } from '@mui/material';
import * as React from 'react';
import { FiltersContainer } from '../container/FiltersContainer';
import { MainContainer } from '../container/MainContainer';
import { TableContainer } from '../container/TableContainer';

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
