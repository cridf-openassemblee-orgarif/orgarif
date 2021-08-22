import { FunctionComponent } from 'react';
import { Role } from '../domain/user';
import { LoginView } from '../view/LoginView';
import { RegisterView } from '../view/RegisterView';
import { RootView } from '../view/RootView';

export type Route = LoginRoute | RegisterRoute | RootRoute;

interface ViewParameters<R extends Route> {
  routeParams: R;
}

interface RouteProps {
  path: string;
  component: FunctionComponent<ViewParameters<any>>;
  role?: Role;
  onEnter?: () => void;
}

export const routes: Record<Route['name'], RouteProps> = {
  LoginRoute: {
    path: '/login',
    component: LoginView
  },
  RegisterRoute: {
    path: '/register',
    component: RegisterView
  },
  RootRoute: {
    path: '/',
    component: RootView
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
