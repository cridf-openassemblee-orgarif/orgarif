/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { state } from '../state/state';
import * as breakpoint from '../styles/breakpoints';

interface HeaderProps {
  shrinked?: boolean;
}

export const Header = React.memo(({ shrinked = false }: HeaderProps) => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const isShrink = useRecoilValue(state.headerShrinked);
  const [isDrawerOpened] = useRecoilState(state.openedDrawer);

  return (
    <>
      {isDrawerOpened ? (
        <Typography
          variant="h1"
          component="h1"
          align="center"
          ref={headerRef}
          css={css`
            font-size: 30px;
            padding-top: 25px;
            padding-bottom: 22px;
            line-height: 80%;

            @media (${breakpoint.TABLET}) {
              font-size: 42px;
              padding-top: 18px;
              padding-bottom: 18px;
            }
          `}
        >
          ORGARIF
        </Typography>
      ) : (
        <Typography
          variant="h1"
          component="h1"
          align="center"
          ref={headerRef}
          css={shrinked === true ? smallHeader : baseHeaderStyle}
        >
          ORGARIF
        </Typography>
      )}
    </>
  );
});

const baseHeaderStyle = css`
  font-size: 23vw;
  line-height: 80%;
  user-select: none;
  transition: all 1s ease-in-out;
  padding-top: 60px;
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
