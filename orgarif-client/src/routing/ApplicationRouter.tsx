/** @jsxImportSource @emotion/react */
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
import { state } from '../state/state';
import { NotFoundView } from '../view/NotFoundView';
import { ApplicationRoute, routes } from './routes';
import { useGoTo } from './useGoTo';
import { Role } from '../domain/user';

const RouteComponent = (props: {
  component: FunctionComponent<{ route: ApplicationRoute | undefined }>;
  routeName: ApplicationRoute['name'];
  role?: Role;
}) => {
  const [userInfos] = useRecoilState(state.userInfos);
  const location = useLocation();
  const goTo = useGoTo();
  useEffect(() => {
    // TODO test all this...
    if (props.role && (!userInfos || !userInfos.roles.includes(props.role))) {
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
            targetPath: location.pathname
          }
        );
      }
    }
  }, [props.role, userInfos, goTo, location.pathname]);
  const route = {
    name: props.routeName,
    ...useParams()
  } as ApplicationRoute;
  return React.createElement(props.component, { route });
};

// TODO see useRoutes
export const ApplicationRouter = () => (
  <BrowserRouter>
    <Routes>
      {Object.entries(routes).map(e => {
        // [doc] DO NOT use a key here, because router Switch only displays once at one,
        // and it's complicated to use a key which doesn't produce useless re-rendering
        // TODO is NOT enough ! force key in MainContainer ? hierarchical views if same view for several paths ?
        const route = e[1];
        return (
          <Route
            path={route.path}
            element={
              <RouteComponent
                component={route.component}
                role={route.role}
                routeName={e[0] as ApplicationRoute['name']}
              />
            }
          />
        );
      })}
      <Route element={<NotFoundView />} />
    </Routes>
  </BrowserRouter>
);
