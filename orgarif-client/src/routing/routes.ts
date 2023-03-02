import { FunctionComponent } from 'react';
import { Role } from '../domain/user';
import { LoginView } from '../view/LoginView';
import { RegisterView } from '../view/RegisterView';
import { RootView } from '../view/RootView';
import { UsersManagementView } from '../view/UsersManagementView';
import { UserId } from '../domain/ids';
import { UserManagementView } from '../view/UserManagementView';

// TODO[tmpl] secure that "name" can't be a route parameter
export type ApplicationRoute =
  | LoginRoute
  | RegisterRoute
  | RootRoute
  | UserManagementRoute
  | UsersManagementRoute;

export interface ApplicationRouteProps<T extends ApplicationRoute> {
  path: string;
  component: FunctionComponent<{ route: T | undefined }>;
  role?: Role;
}

export const routes: Record<
  ApplicationRoute['name'],
  ApplicationRouteProps<any>
> = {
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
  UserManagementRoute: {
    path: '/users-management/:userId',
    component: UserManagementView,
    role: 'admin'
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

export interface UserManagementRoute {
  name: 'UserManagementRoute';
  userId: UserId;
}

interface UsersManagementRoute {
  name: 'UsersManagementRoute';
}
