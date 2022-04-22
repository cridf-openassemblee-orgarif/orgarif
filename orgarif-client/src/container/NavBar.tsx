/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Header } from '../component/Header';
import { MobileMenu } from '../component/MobileMenu';
import SigninDialog from '../component/SigninDialog';
import { LogoutForm } from '../form/LogoutForm';
import { Logo } from '../icon/collection/Logo';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { isMobile, isTabletAndMore } from '../utils/viewport-utils';

export const NavBar = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  const location = useLocation();

  return (
    <Box>
      <AppBar>
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
              <Logo width={isMobile() ? 120 : 200} height={70} />
            </RouteLink>
          </Box>
          {isMobile() && <MobileMenu />}
          {isTabletAndMore() && !userInfos && <SigninDialog />}
          {isTabletAndMore() && userInfos && <LogoutForm />}
        </Toolbar>
      </AppBar>
      {userInfos || location.pathname !== '/' ? (
        <Header shrinked={true} />
      ) : (
        <Header />
      )}
    </Box>
  );
};
