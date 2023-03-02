/** @jsxImportSource @emotion/react */
import { state } from '../../state/state';
import { NotFoundView } from '../not-found/NotFoundView';
import { ApplicationRoute, ApplicationRouteProps, routes } from './routes';
import { useGoTo } from './routing-utils';
import * as React from 'react';
import { FunctionComponent, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams
} from 'react-router-dom';
import { useRecoilState } from 'recoil';

const RouteComponent = (props: ApplicationRouteProps<any>) => {
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
  const route = {
    name: props.name,
    ...useParams()
  } as ApplicationRoute;
  return React.createElement(props.component, { route });
};

const RootSubComponent = (props: {
  name: ApplicationRoute['name'];
  component: FunctionComponent<{ route: any | undefined }>;
}) => {
  const route = {
    name: props.name,
    ...useParams()
  } as ApplicationRoute;
  return React.createElement(props.component, { route });
};

const renderRoutes = (
  parentPath: string,
  routes: ApplicationRouteProps<any>[]
) =>
  routes.map(route => {
    const path = parentPath + route.path;
    return (
      <Route path={path} element={<RouteComponent {...route} />}>
        {route.rootSubComponent && (
          <Route
            index
            element={
              <RootSubComponent
                name={route.name}
                component={route.rootSubComponent}
              />
            }
          />
        )}
        {route.subRoutes && renderRoutes(path, route.subRoutes)}
      </Route>
    );
  });

// TODO[tmpl] questions about routing:
// * how roles work with subrouting
// Checking to do:
// * path declaration consistency
// * path parameters with interface consistency
// * components parameters with interface consistency
// TODO[tmpl] see useRoutes
export const ApplicationRouter = () => (
  <BrowserRouter>
    <Routes>
      {/*
      // [doc] DO NOT use a key here, because router Switch only displays once at one,
      // and it's complicated to use a key which doesn't produce useless re-rendering
      // TODO[tmpl] is NOT enough ! force key in MainContainer ? hierarchical views if same view for several paths ?
      */}
      {renderRoutes('', routes)}
      <Route element={<NotFoundView />} />
    </Routes>
  </BrowserRouter>
);
