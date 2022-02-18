/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { Header } from '../component/Header';
import { LogoutForm } from '../form/LogoutForm';
import { Logo } from '../icon/collection/Logo';
import { SignIn } from '../icon/collection/SignIn';
import { SignOut } from '../icon/collection/SignOut';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { colors } from '../styles/colors';

export const NavBar = () => {
  const [userInfos] = useRecoilState(state.userInfos);

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Box
            css={css`
              flex-grow: 1;
            `}
          >
            <RouteLink route={{ name: 'RootRoute' }}>
              <Logo width={200} height={70} />
            </RouteLink>
          </Box>
          {!userInfos && (
            <RouteLink
              forwardCss={css`
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
          {userInfos && (
            <Box
              css={`
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
