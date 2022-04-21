/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Container } from '@mui/material';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { FiltersContainer } from '../container/FiltersContainer';
import { MainContainer } from '../container/MainContainer';
import { NavBar } from '../container/NavBar';
import { TableContainer } from '../container/TableContainer';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { asString } from '../utils/nominal-class';

export const ResultsView = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  const [secteurs] = useRecoilState(state.secteurs);

  return (
    <Container maxWidth={false} disableGutters>
      <NavBar />
      <FiltersContainer />
      <TableContainer />
    </Container>
  );
};
