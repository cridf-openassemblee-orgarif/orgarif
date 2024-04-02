/** @jsxImportSource @emotion/react */
import { SignIn } from '../../icon/collection/SignIn';
import { state } from '../../state/state';
import { LogoutButton } from '../common/form/LogoutButton';
import { RouteLink } from '../routing/RouteLink';
import { colors } from '../styles/colors';
import { css } from '@emotion/react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export const AppMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
        id="bouton-menu"
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
          'aria-labelledby': 'bouton-menu'
        }}
      >
        {!userInfos && (
          <MenuItem>
            <RouteLink
              addCss={css`
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
          </MenuItem>
        )}
        {userInfos && (
          <>
            <MenuItem>
              <RouteLink
                route={{
                  name: 'AccountRoute'
                }}
              >
                Gérer le compte
              </RouteLink>
            </MenuItem>
            <MenuItem>
              <RouteLink
                route={{
                  name: 'RepresentantsRoute'
                }}
              >
                Liste des représentants
              </RouteLink>
            </MenuItem>
            {userInfos.roles.includes('Admin') && (
              <MenuItem>
                <RouteLink
                  route={{
                    name: 'UsersManagementRoute'
                  }}
                >
                  Gestion des utilisateurs
                </RouteLink>
              </MenuItem>
            )}
            <MenuItem>
              <LogoutButton />
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};
