import { Container } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { NavBar } from './NavBar';

export const MainContainer = (props: PropsWithChildren<{}>) => (
  <Container maxWidth={false} disableGutters>
    <NavBar />
    {props.children}
  </Container>
);
