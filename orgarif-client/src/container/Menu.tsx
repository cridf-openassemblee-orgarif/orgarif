/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LogoutForm } from '../form/LogoutForm';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';

export const Menu = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  return (
    <div>
      {userInfos && <div>Connected user : {userInfos.mail}</div>}
      <div>
        <RouteLink
          route={{
            name: 'RootRoute',
          }}
        >
          Go to root
        </RouteLink>
      </div>
      <div>
        <Link to="nimporte-quoi">404</Link>
      </div>
      {userInfos && <LogoutForm />}
      {!userInfos && (
        <React.Fragment>
          <div>
            <RouteLink
              route={{
                name: 'LoginRoute',
              }}
            >
              Login
            </RouteLink>
          </div>
          <div>
            <RouteLink
              route={{
                name: 'RegisterRoute',
              }}
            >
              Register
            </RouteLink>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
