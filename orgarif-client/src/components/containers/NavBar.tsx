/** @jsxImportSource @emotion/react */
import { Logo } from '../../icon/collection/Logo';
import { state } from '../../state/state';
import { isMobile } from '../../utils/viewport-utils';
import { LogoutButton } from '../common/form/LogoutButton';
import { MobileMenu } from '../root/MobileMenu';
import SigninDialog from '../root/SigninDialog';
import { RouteLink } from '../routing/RouteLink';
import { breakpoints } from '../styles/breakpoints';
import { Dimensions } from '../styles/dimensions';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const classes = {
  title: css`
    font-size: 30px;
    padding-top: 25px;
    padding-bottom: 22px;
    line-height: 80%;
    z-index: 5000;
    position: fixed;
    left: 50%;
    width: min-content;
    top: 0;

    -webkit-animation: slide-in-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: slide-in-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

    @media (${breakpoints.TABLET}) {
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
  `
};

export const NavBar = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  const displayLandingPage = useRecoilValue(state.displayLandingPage);
  return (
    <AppBar
      css={css`
        height: ${Dimensions.headerHeight}px;
      `}
    >
      <Toolbar
        css={css`
          padding: 0;
        `}
      >
        <Box
          css={css`
            flex-grow: 1;
          `}
        >
          <RouteLink route={{ name: 'RootRoute' }}>
            <Logo
              width={isMobile() ? 120 : 200}
              height={Dimensions.headerHeight}
            />
          </RouteLink>
        </Box>
        {isMobile() && <MobileMenu />}
        {!isMobile() && !userInfos && <SigninDialog />}
        {!isMobile() && userInfos && <LogoutButton />}
        {!displayLandingPage && (
          <Typography
            variant="h1"
            component="h1"
            align="center"
            css={classes.title}
          >
            ORGARIF
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};
