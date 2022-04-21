/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Header } from '../component/Header';
import { MobileMenu } from '../component/MobileMenu';
import { LogoutForm } from '../form/LogoutForm';
import { Logo } from '../icon/collection/Logo';
import { SignIn } from '../icon/collection/SignIn';
import { SignOut } from '../icon/collection/SignOut';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { colors } from '../styles/colors';
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
          {isTabletAndMore() && !userInfos && (
            <RouteLink
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                color: ${colors.dark};
              `}
              route={{
                name: 'LoginRoute'
              }}
            >
              <SignIn size={36} />
              <Link
                variant="body2"
                underline="hover"
                component="button"
                css={css`
                  margin-left: 0.5em;
                  color: ${colors.dark};
                  padding-right: 1em;
                `}
              >
                Connexion
              </Link>
            </RouteLink>
          )}
          {isTabletAndMore() && userInfos && (
            <Box
              css={css`
                display: flex;
                padding-right: 1em;
              `}
            >
              <SignOut size={36} />
              <LogoutForm />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Header />
    </Box>
  );
};
