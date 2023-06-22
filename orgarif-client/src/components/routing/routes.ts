import { OrganismeId } from '../../generated/domain/Ids';
import { UserId } from '../../generated/domain/Ids';
import { Role } from '../../generated/domain/User';
import { dict, Dict, flatMap } from '../../utils/nominal-class';
import { EditDepartementsView } from '../../view/EditDepartementsView';
import { EditNatureJuridiquesView } from '../../view/EditNatureJuridiquesView';
import { EditOrganismeView } from '../../view/EditOrganismeView';
import { EditSecteursView } from '../../view/EditSecteursView';
import { EditTypeStructuresView } from '../../view/EditTypeStructuresView';
import { ListOrganismesView } from '../../view/ListOrganismesView';
import { OrganismeView } from '../../view/OrganismeView';
import { AccountView } from '../account/AccountView';
import { AdminManualCommandView } from '../admin/AdminManualCommandView';
import { LoginView } from '../login/LoginView';
import { RegisterView } from '../register/RegisterView';
import { RootView } from '../root/RootView';
import { UsersManagementView } from '../users-management/UsersManagementView';
import { FunctionComponent } from 'react';

// TODO[tmpl] secure that "name" can't be a route parameter
export type ApplicationRoute =
  | AccountRoute
  | AdminManualCommandRoute
  | EditDepartementsRoute
  | EditNatureJuridiquesRoute
  | EditOrganismeRoute
  | EditSecteursRoute
  | EditTypeStructuresRoute
  | ListOrganismesRoute
  | LoginRoute
  | OrganismeRoute
  | RegisterRoute
  | RootRoute
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

export const routes: ApplicationRouteProps<any>[] = [
  { name: 'AccountRoute', path: '/account', component: AccountView },
  {
    name: 'EditDepartementsRoute',
    path: '/edition-departements',
    component: EditDepartementsView,
    role: 'User'
  },
  {
    name: 'AdminManualCommandRoute',
    path: '/admin/manual-command',
    component: AdminManualCommandView,
    role: 'Admin'
  },
  {
    name: 'EditNatureJuridiquesRoute',
    path: '/edition-nature-juridiques',
    component: EditNatureJuridiquesView,
    role: 'User'
  },
  {
    name: 'EditOrganismeRoute',
    path: '/organisme/:id/edit',
    component: EditOrganismeView,
    role: 'User'
  },
  {
    name: 'EditSecteursRoute',
    path: '/edition-secteurs',
    component: EditSecteursView,
    role: 'User'
  },
  {
    name: 'EditTypeStructuresRoute',
    path: '/edition-type-structures',
    component: EditTypeStructuresView,
    role: 'User'
  },
  {
    name: 'ListOrganismesRoute',
    path: '/dev-list',
    component: ListOrganismesView
  },
  {
    name: 'LoginRoute',
    path: '/login',
    component: LoginView
  },
  {
    name: 'OrganismeRoute',
    path: '/organisme/:id',
    component: OrganismeView
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

interface AccountRoute {
  name: 'AccountRoute';
}

interface AdminManualCommandRoute {
  name: 'AdminManualCommandRoute';
}

interface EditDepartementsRoute {
  name: 'EditDepartementsRoute';
}

export interface EditNatureJuridiquesRoute {
  name: 'EditNatureJuridiquesRoute';
}

export interface EditOrganismeRoute {
  name: 'EditOrganismeRoute';
  id: OrganismeId;
}

export interface EditSecteursRoute {
  name: 'EditSecteursRoute';
}

export interface EditTypeStructuresRoute {
  name: 'EditTypeStructuresRoute';
}

interface ListOrganismesRoute {
  name: 'ListOrganismesRoute';
}

interface LoginRoute {
  name: 'LoginRoute';
}

interface OrganismeRoute {
  name: 'OrganismeRoute';
  id: OrganismeId;
}

interface RegisterRoute {
  name: 'RegisterRoute';
}

interface RootRoute {
  name: 'RootRoute';
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
