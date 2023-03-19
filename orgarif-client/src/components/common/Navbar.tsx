/** @jsxImportSource @emotion/react */
import { state } from '../../state/state';
import { RouteLink } from '../routing/RouteLink';
import { colors } from '../styles/vars';
import { LogoutButton } from './form/LogoutButton';
import { css } from '@emotion/react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

export const Navbar = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  const buttonElement = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 36px;
        padding: 10px 20px;
        background: ${colors.grey};
      `}
    >
      <RouteLink
        css={css`
          color: ${colors.white};
          text-decoration: none;
          text-transform: uppercase;
        `}
        route={{
          name: 'RootRoute'
        }}
      >
        Orgarif
      </RouteLink>
      <div
        css={css`
          display: flex;
        `}
      >
        <IconButton
          onClick={() => setOpen(!open)}
          ref={buttonElement}
          css={css`
            color: ${colors.white};
          `}
        >
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={buttonElement.current} open={open} onClose={close}>
          {!userInfos && (
            <>
              <MenuItem onClick={close}>
                <RouteLink
                  route={{
                    name: 'LoginRoute'
                  }}
                >
                  Login
                </RouteLink>
              </MenuItem>
              <MenuItem onClick={close}>
                <RouteLink
                  route={{
                    name: 'RegisterRoute'
                  }}
                >
                  Register
                </RouteLink>
              </MenuItem>
            </>
          )}
          {userInfos && (
            <>
              {userInfos.roles.includes('Admin') && (
                <MenuItem onClick={close}>
                  <RouteLink
                    route={{
                      name: 'UsersManagementRoute'
                    }}
                  >
                    Users management
                  </RouteLink>
                </MenuItem>
              )}
              <MenuItem onClick={close}>
                <LogoutButton />
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};
