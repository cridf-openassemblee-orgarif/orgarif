/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useEffect } from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { state } from '../state/state';
import { NotFoundView } from '../view/NotFoundView';
import { ApplicationRouteProps, routes } from './routes';
import { useGoTo } from './useGoTo';

const RouteComponent = (props: { route: ApplicationRouteProps }) => {
  const [userInfos] = useRecoilState(state.userInfos);
  const goTo = useGoTo();
  useEffect(() => {
    // TODO test all this...
    if (
      props.route.role &&
      (!userInfos || !userInfos.roles.includes(props.route.role))
    ) {
      if (userInfos) {
        // TODO make a notification "unauthorized"
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
            targetPath: props.route.path
          }
        );
      }
    }
  }, [props.route, userInfos, goTo]);
  return React.createElement(props.route.component);
};

export const ApplicationRouter = () => (
  <BrowserRouter>
    <Routes>
      {Object.values(routes).map(route => {
        // [doc] DO NOT use a key here, because router Switch only displays once at one,
        // and it's complicated to use a key which doesn't produce useless re-rendering
        // TODO is NOT enough ! force key in MainContainer ? hierarchical views if same view for several paths ?
        return (
          <Route path={route.path} element={<RouteComponent route={route} />} />
        );
      })}
      <Route element={<NotFoundView />} />
    </Routes>
  </BrowserRouter>
);
