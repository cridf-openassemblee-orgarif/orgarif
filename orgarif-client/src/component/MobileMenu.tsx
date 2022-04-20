/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { LogoutForm } from '../form/LogoutForm';
import { SignIn } from '../icon/collection/SignIn';
import { SignOut } from '../icon/collection/SignOut';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { colors } from '../styles/colors';

export const MobileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userInfos] = useRecoilState(state.userInfos);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon color="secondary" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleClose}>
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
              css={css`
                display: flex;
                padding-right: 1em;
              `}
            >
              <SignOut size={36} />
              <LogoutForm />
            </Box>
          )}
        </MenuItem>
      </Menu>
    </>
  );
};
