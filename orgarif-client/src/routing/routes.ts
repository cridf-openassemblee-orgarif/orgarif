import { FunctionComponent } from 'react';
import { LoginView } from '../view/LoginView';
import { RegisterView } from '../view/RegisterView';
import { RootView } from '../view/RootView';
import { UsersManagementView } from '../view/UsersManagementView';
import { UsersManagementIndexSubView } from '../view/users-management/UsersManagementIndexSubView';
import { UsersManagementUserSubView } from '../view/users-management/UsersManagementUserSubView';
import { Dict, dict, flatMap } from '../utils/nominal-class';
import { Role } from '../generated/domain/user';
import { UserId } from '../generated/domain/fmk-ids';

// TODO[tmpl] secure that "name" can't be a route parameter
export type ApplicationRoute =
  | LoginRoute
  | RegisterRoute
  | RootRoute
  | UsersManagementRoute
  | UsersManagementUserRoute;

export interface ApplicationRouteProps<T extends ApplicationRoute> {
  name: ApplicationRoute['name'];
  path: string;
  component: FunctionComponent<{ route: T | undefined }>;
  rootSubComponent?: FunctionComponent<{ route: T | undefined }>;
  role?: Role;
  subRoutes?: ApplicationRouteProps<any>[];
}

export const routes: ApplicationRouteProps<any>[] = [
  {
    name: 'LoginRoute',
    path: '/login',
    component: LoginView
  },
  {
    name: 'RegisterRoute',
    path: '/register',
    component: RegisterView
  },
  {
    name: 'RootRoute',
    path: '/',
    component: RootView
  },
  {
    name: 'UsersManagementRoute',
    path: '/users-management',
    component: UsersManagementView,
    rootSubComponent: UsersManagementIndexSubView,
    role: 'Admin',
    subRoutes: [
      {
        name: 'UsersManagementUserRoute',
        path: '/:userId',
        component: UsersManagementUserSubView,
        role: 'Admin'
      }
    ]
  }
];

const flattenRoute = (
  rootPath: string,
  r: ApplicationRouteProps<any>
): [string, string][] => {
  const path = rootPath + r.path;
  return [
    [r.name, path],
    ...(r.subRoutes ? flatMap(r.subRoutes, r => flattenRoute(path, r)) : [])
  ];
};

export const routePathMap: Dict<ApplicationRoute['name'], string> = dict(
  flatMap(routes, r => flattenRoute('', r))
);

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

export interface UsersManagementUserRoute {
  name: 'UsersManagementUserRoute';
  userId: UserId;
}
