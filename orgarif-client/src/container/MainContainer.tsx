import { Container } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { NavBar } from './NavBar';

export const MainContainer = (props: PropsWithChildren<{}>) => {
  return (
    <Container maxWidth={false} disableGutters>
      <Box position="fixed" width="100%">
        <NavBar />
        {props.children}
      </Box>
    </Container>
  );
};
