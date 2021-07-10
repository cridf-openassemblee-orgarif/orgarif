import { FunctionComponent } from 'react';
import { LoginView } from '../view/LoginView';
import { RegisterView } from '../view/RegisterView';
import { RootView } from '../view/RootView';

export type Route = LoginRoute | RegisterRoute | RootRoute;

type AuthenticationLevel = 'anonymous' | 'loggedIn' | 'admin';

interface ViewParameters<R extends Route> {
  routeParams: R;
}

interface RouteProps {
  path: string;
  component: FunctionComponent<ViewParameters<any>>;
  authenticationLevel: AuthenticationLevel;
  onEnter?: () => void;
}

export const routes: Record<Route['name'], RouteProps> = {
  LoginRoute: {
    path: '/login',
    component: LoginView,
    authenticationLevel: 'anonymous'
  },
  RegisterRoute: {
    path: '/register',
    component: RegisterView,
    authenticationLevel: 'anonymous'
  },
  RootRoute: {
    path: '/',
    component: RootView,
    authenticationLevel: 'anonymous'
  }
};

interface LoginRoute {
  name: 'LoginRoute';
}

interface RegisterRoute {
  name: 'RegisterRoute';
}

interface RootRoute {
  name: 'RootRoute';
}
