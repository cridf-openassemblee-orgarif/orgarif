/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Route, Router, Switch } from 'react-router';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { state } from '../state/state';
import { NotFoundView } from '../view/NotFoundView';
import { routes } from './routes';

export const ApplicationRouter = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  return (
    <Router history={appContext.applicationHistory().browserHistory}>
      <Switch>
        {Object.entries(routes).map(entry => {
          const [k, r] = entry;
          return (
            <Route
              key={r.path}
              exact={true}
              path={r.path}
              render={(routerProps: RouteComponentProps<any>) => {
                if (
                  r.role &&
                  (!userInfos || !userInfos.roles.includes(r.role))
                ) {
                  return (
                    <Redirect
                      to={{
                        pathname: routes.RootRoute.path,
                        state: { from: routerProps.location }
                      }}
                    />
                  );
                }
                return React.createElement(r.component, {
                  routeParams: {
                    ...routerProps.match.params,
                    name: k
                  }
                });
              }}
            />
          );
        })}
        <Route exact={false} component={NotFoundView} />
      </Switch>
    </Router>
  );
};
