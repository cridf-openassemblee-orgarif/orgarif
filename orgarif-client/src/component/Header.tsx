/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Slide, Typography } from '@mui/material';
import * as React from 'react';
import * as breakpoint from '../styles/breakpoints';

interface HeaderProps {
  shrinked?: boolean;
}

export const Header = React.memo(({ shrinked = false }: HeaderProps) => {
  return (
    <>
      {shrinked ? (
        <Typography
          variant="h1"
          component="h1"
          align="center"
          css={smallHeader}
        >
          ORGARIF
        </Typography>
      ) : (
        <Slide
          direction="down"
          in={true}
          timeout={400}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <Typography
              variant="h1"
              component="h1"
              align="center"
              css={baseHeaderStyle}
            >
              ORGARIF
            </Typography>
          </div>
        </Slide>
      )}
    </>
  );
});

const baseHeaderStyle = css`
  font-size: 23vw;
  line-height: 80%;
  user-select: none;
  transition: all 1s ease-in-out;
  padding-top: 80px;
  padding-bottom: 10px;

  @media (${breakpoint.LAPTOP}) {
    padding-top: 60px;
    padding-bottom: 0px;
  }
`;

const smallHeader = css`
  font-size: 30px;
  padding-top: 25px;
  padding-bottom: 22px;
  line-height: 80%;
  z-index: 5000;
  position: fixed;
  left: 50%;
  width: min-content;
  top: 0;

  -webkit-animation: slide-in-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media (${breakpoint.TABLET}) {
    font-size: 42px;
    padding-top: 18px;
    padding-bottom: 18px;
  }

  @-webkit-keyframes slide-in-top {
    0% {
      -webkit-transform: translate(-50%, -100%);
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    100% {
      -webkit-transform: translate(-50%, 0);
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
  @keyframes slide-in-top {
    0% {
      -webkit-transform: translate(-50%, -100%);
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    100% {
      -webkit-transform: translate(-50%, 0);
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`;
