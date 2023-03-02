/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { FunctionComponent, useEffect } from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Routes, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { state } from '../state/state';
import { NotFoundView } from '../view/NotFoundView';
import { routes } from './routes';
import { useGoTo } from './useGoTo';
import { Role } from '../domain/user';

const RouteComponent = (props: {
  component: FunctionComponent;
  role?: Role;
}) => {
  const [userInfos] = useRecoilState(state.userInfos);
  const location = useLocation();
  const goTo = useGoTo();
  useEffect(() => {
    // TODO[tmpl] test all this...
    if (props.role && (!userInfos || !userInfos.roles.includes(props.role))) {
      if (userInfos) {
        // TODO[tmpl] make a notification "unauthorized"
        goTo(
          { name: 'RootRoute' },
          {
            replace: true
          }
        );
      } else {
        goTo(
          { name: 'LoginRoute' },
          {
            replace: false,
            targetPath: location.pathname
          }
        );
      }
    }
  }, [props.role, userInfos, goTo, location.pathname]);
  return React.createElement(props.component);
};

// TODO[tmpl] see useRoutes
export const ApplicationRouter = () => (
  <BrowserRouter>
    <Routes>
      {Object.values(routes).map(route => {
        // [doc] DO NOT use a key here, because router Switch only displays once at one,
        // and it's complicated to use a key which doesn't produce useless re-rendering
        // TODO[tmpl] is NOT enough ! force key in MainContainer ? hierarchical views if same view for several paths ?
        return (
          <Route
            path={route.path}
            element={
              <RouteComponent component={route.component} role={route.role} />
            }
          />
        );
      })}
      <Route element={<NotFoundView />} />
    </Routes>
  </BrowserRouter>
);
