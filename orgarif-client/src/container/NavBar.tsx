/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { LogoutForm } from '../form/LogoutForm';
import * as icons from '../icon';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { colors } from '../styles/colors';

export function NavBar() {
  const [userInfos] = useRecoilState(state.userInfos);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <RouteLink route={{ name: 'RootRoute' }}>
              <icons.Logo width={200} height={70} />
            </RouteLink>
          </Box>
          {!userInfos && (
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
              <icons.SignIn size={36} />
              <Link
                variant="body2"
                underline="hover"
                component="button"
                sx={{ ml: 1, color: `${colors.dark}`, pr: 2 }}
              >
                Connexion
              </Link>
            </RouteLink>
          )}
          {userInfos && (
            <Box sx={{ display: 'flex', pr: 2 }}>
              <icons.SignOut size={36} />
              <LogoutForm />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
