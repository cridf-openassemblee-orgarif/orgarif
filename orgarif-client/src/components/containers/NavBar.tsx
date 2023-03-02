/** @jsxImportSource @emotion/react */
import { Logo } from '../../icon/collection/Logo';
import { state } from '../../state/state';
import { isMobile, isTabletAndMore } from '../../utils/viewport-utils';
import { LogoutButton } from '../common/form/LogoutButton';
import { Header } from '../root/Header';
import { MobileMenu } from '../root/MobileMenu';
import SigninDialog from '../root/SigninDialog';
import { RouteLink } from '../routing/RouteLink';
import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

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
          {isTabletAndMore() && userInfos && <LogoutButton />}
        </Toolbar>
      </AppBar>
      <Header
        shrinked={!!userInfos || location.pathname !== '/' || isMobile()}
      />
    </Box>
  );
};
