import { Container } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Header } from '../component/Header';
import { FiltersContainer } from './FiltersContainer';
import { NavBar } from './NavBar';
import { TableContainer } from './TableContainer';

export const MainContainer = (props: PropsWithChildren<{}>) => {
  return (
    <Container maxWidth={false} disableGutters>
      <Box width="100%">
        <NavBar />
        <Header />
        <FiltersContainer />
        <TableContainer />
        {props.children}
      </Box>
    </Container>
  );
};
