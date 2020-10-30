import { FunctionComponent } from 'react';
import { LoginView } from '../view/LoginView';
import { RegisterView } from '../view/RegisterView';
import { RootView } from '../view/RootView';

export type Route = RootRoute | LoginRoute | RegisterRoute;

type AuthenticationLevel = 'neutral' | 'loggedIn' | 'loggedOut' | 'admin';

interface RouteProps {
  path: string;
  component: FunctionComponent;
  authenticationLevel: AuthenticationLevel;
  onEnter?: () => void;
}

export const routes: Record<Route['name'], RouteProps> = {
  RootRoute: {
    path: '/',
    component: RootView,
    authenticationLevel: 'neutral',
  },
  LoginRoute: {
    path: '/login',
    component: LoginView,
    authenticationLevel: 'loggedOut',
  },
  RegisterRoute: {
    path: '/register',
    component: RegisterView,
    authenticationLevel: 'loggedOut',
  },
};

interface RootRoute {
  name: 'RootRoute';
}

interface LoginRoute {
  name: 'LoginRoute';
}

interface RegisterRoute {
  name: 'RegisterRoute';
}

interface RootRoute {
  name: 'RootRoute';
}
