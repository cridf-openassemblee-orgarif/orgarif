/** @jsxImportSource @emotion/react */
import { state } from '../../state/state';
import { RouteLink } from '../routing/RouteLink';
import { colors } from '../styles/vars';
import { LogoutButton } from './form/LogoutButton';
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';

export const Menu = () => {
  const [userInfos] = useRecoilState(state.userInfos);
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
        {userInfos && (
          <div
            css={css`
              color: ${colors.white};
              margin: 0 10px;
            `}
          >
            {userInfos.mail}
          </div>
        )}
        {userInfos && <LogoutButton />}
        {!userInfos && (
          <React.Fragment>
            <RouteLink
              css={css`
                color: ${colors.white};
                margin: 0 10px;
              `}
              route={{
                name: 'LoginRoute'
              }}
            >
              Login
            </RouteLink>
            <RouteLink
              css={css`
                color: ${colors.white};
                margin: 0 10px;
              `}
              route={{
                name: 'RegisterRoute'
              }}
            >
              Register
            </RouteLink>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
