/** @jsxImportSource @emotion/react */
import { NavBar } from './NavBar';
import { Container } from '@mui/material';
import { PropsWithChildren } from 'react';

export const MainContainer = (props: PropsWithChildren<{}>) => {
  return (
    <Container maxWidth={false} disableGutters>
      <NavBar />
      {props.children}
    </Container>
  );
};
