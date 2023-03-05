/** @jsxImportSource @emotion/react */
import { breakpoints } from '../styles/breakpoints';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import * as React from 'react';

export const LandingTitle = () => (
  <Slide direction="down" in={true} timeout={400} mountOnEnter unmountOnExit>
    <div>
      <Typography
        variant="h1"
        component="h1"
        align="center"
        css={css`
          font-size: 23vw;
          line-height: 80%;
          user-select: none;
          transition: all 1s ease-in-out;
          padding-top: 80px;
          padding-bottom: 10px;
          text-transform: uppercase;

          @media (${breakpoints.LAPTOP}) {
            padding-top: 60px;
            padding-bottom: 0;
          }
        `}
      >
        Orgarif
      </Typography>
    </div>
  </Slide>
);
