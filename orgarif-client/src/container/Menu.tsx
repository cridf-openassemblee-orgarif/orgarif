/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { LogoutForm } from '../form/LogoutForm';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { colors } from '../styles/vars';

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
        forwardCss={css`
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
        {userInfos && <LogoutForm />}
        {!userInfos && (
          <React.Fragment>
            <RouteLink
              forwardCss={css`
                color: ${colors.white};
                margin: 0 10px;
              `}
              route={{
                name: 'LoginRoute'
              }}
            >
              Identification
            </RouteLink>
            <RouteLink
              forwardCss={css`
                color: ${colors.white};
                margin: 0 10px;
              `}
              route={{
                name: 'RegisterRoute'
              }}
            >
              Créer un compte
            </RouteLink>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
