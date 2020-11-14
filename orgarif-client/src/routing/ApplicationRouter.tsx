/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Route, Router, Switch } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { appContext } from '../ApplicationContext';
import { NotFoundView } from '../view/NotFoundView';
import { routes } from './routes';

export const ApplicationRouter = () => (
  <Router history={appContext.applicationHistory().browserHistory}>
    <Switch>
      {Object.values(routes).map(r => (
        <Route
          key={r.path}
          exact={true}
          path={r.path}
          render={(routerProps: RouteComponentProps<any>) => {
            return React.createElement(r.component, {
              // @ts-ignore
              routeParams: routerProps.match.params
            });
          }}
        />
      ))}
      <Route exact={false} component={NotFoundView} />
    </Switch>
  </Router>
);
