import { UserId } from '../../generated/domain/fmk-ids';
import { Role } from '../../generated/domain/user';
import { dict, Dict, flatMap } from '../../utils/nominal-class';
import { LoginView } from '../login/LoginView';
import { RegisterView } from '../register/RegisterView';
import { RootView } from '../root/RootView';
import { UsersManagementView } from '../users-management/UsersManagementView';
import { FunctionComponent } from 'react';

// TODO[tmpl] secure that "name" can't be a route parameter
export type ApplicationRoute =
  | LoginRoute
  | RegisterRoute
  | RootRoute
  | TestRoute
  | TestSubRoute
  | TestSubIdRoute
  | UsersManagementRoute
  | UsersManagementUserEditRolesRoute
  | UsersManagementUserRoute;

export interface ApplicationRouteProps<T extends ApplicationRoute> {
  name: ApplicationRoute['name'];
  path: string;
  component: FunctionComponent<{ route: T | undefined }>;
  rootSubComponent?: FunctionComponent<{ route: T | undefined }>;
  role?: Role;
  subRoutes?: ApplicationRouteProps<any>[];
}

// TODO naming
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
    name: 'TestRoute',
    path: '/test',
    component: RootView
  },
  {
    name: 'TestSubRoute',
    path: '/test/sub-test',
    component: RootView
  },
  {
    name: 'TestSubIdRoute',
    path: '/test/sub-test/:id',
    component: RootView
  },
  {
    name: 'UsersManagementRoute',
    path: '/users-management',
    component: UsersManagementView,
    role: 'Admin'
  },
  {
    name: 'UsersManagementUserEditRolesRoute',
    path: '/users-management/:userId/edit-roles',
    component: UsersManagementView,
    role: 'Admin'
  },
  {
    name: 'UsersManagementUserRoute',
    path: '/users-management/:userId',
    component: UsersManagementView,
    role: 'Admin'
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

interface TestRoute {
  name: 'TestRoute';
}

interface TestSubRoute {
  name: 'TestSubRoute';
}

interface TestSubIdRoute {
  name: 'TestSubIdRoute';
  id: string;
}

export interface UsersManagementRoute {
  name: 'UsersManagementRoute';
}

export interface UsersManagementUserEditRolesRoute {
  name: 'UsersManagementUserEditRolesRoute';
  userId: UserId;
}

export interface UsersManagementUserRoute {
  name: 'UsersManagementUserRoute';
  userId: UserId;
}
