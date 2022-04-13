import { FunctionComponent } from 'react';
import { Role } from '../domain/user';
import { LoginView } from '../view/LoginView';
import { RegisterView } from '../view/RegisterView';
import { RootView } from '../view/RootView';
import { UsersManagementView } from '../view/UsersManagementView';

export type Route =
  | LoginRoute
  | RegisterRoute
  | RootRoute
  | UsersManagementRoute;

export interface ApplicationRouteProps {
  path: string;
  component: FunctionComponent;
  role?: Role;
}

export const routes: Record<Route['name'], ApplicationRouteProps> = {
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
  },
  UsersManagementRoute: {
    path: '/users-management',
    component: UsersManagementView,
    role: 'admin'
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

interface UsersManagementRoute {
  name: 'UsersManagementRoute';
}
