import { Container } from '@mui/material';
import { PropsWithChildren } from 'react';
import { NavBar } from './NavBar';

export const MainContainer = (props: PropsWithChildren<{}>) => {
  return (
    <Container maxWidth={false} disableGutters>
      <NavBar />
      {props.children}
    </Container>
  );
};
