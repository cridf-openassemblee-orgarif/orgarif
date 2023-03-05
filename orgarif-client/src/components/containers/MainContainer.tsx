/** @jsxImportSource @emotion/react */
import { Dimensions } from '../styles/dimensions';
import { NavBar } from './NavBar';
import { css } from '@emotion/react';
import { Container } from '@mui/material';
import { PropsWithChildren } from 'react';

export const MainContainer = (props: PropsWithChildren<{}>) => {
  return (
    <Container maxWidth={false} disableGutters>
      <NavBar />
      <div
        css={css`
          padding-top: ${Dimensions.headerHeight}px;
        `}
      >
        {props.children}
      </div>
    </Container>
  );
};
