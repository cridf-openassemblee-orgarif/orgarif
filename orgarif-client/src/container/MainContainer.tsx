import { Container } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { BasicFiltersContainer } from './BasicFiltersContainer';
import { NavBar } from './NavBar';
import { TableContainer } from './TableContainer';

export const MainContainer = (props: PropsWithChildren<{}>) => {
  return (
    <Container maxWidth={false} disableGutters>
      <NavBar />
      <BasicFiltersContainer />
      {props.children}
    </Container>
  );
};
