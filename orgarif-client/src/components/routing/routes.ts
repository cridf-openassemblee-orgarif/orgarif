import { UserId } from '../../generated/domain/fmk-ids';
import { OrganismeId, SecteurId } from '../../generated/domain/ids';
import { Role } from '../../generated/domain/user';
import { Dict, dict, flatMap } from '../../utils/nominal-class';
import { EditDepartementsView } from '../../view/EditDepartementsView';
import { EditNatureJuridiquesView } from '../../view/EditNatureJuridiquesView';
import { EditOrganismeView } from '../../view/EditOrganismeView';
import { EditSecteursView } from '../../view/EditSecteursView';
import { EditTypeStructuresView } from '../../view/EditTypeStructuresView';
import { ListOrganismesBySecteurView } from '../../view/ListOrganismesBySecteurView';
import { ListOrganismesView } from '../../view/ListOrganismesView';
import { OrganismesView } from '../../view/OrganismesView';
import { SingleOrganismeView } from '../../view/SingleOrganismeView';
import { LoginView } from '../login/LoginView';
import { RegisterView } from '../register/RegisterView';
import { RootView } from '../root/RootView';
import { UsersManagementView } from '../users-management/UsersManagementView';
import { FunctionComponent } from 'react';

// TODO[tmpl] secure that "name" can't be a route parameter
export type ApplicationRoute =
  | EditDepartementsRoute
  | EditListOrganismesRoute
  | EditNatureJuridiquesRoute
  | EditOrganismeRoute
  | EditSecteursRoute
  | EditTypeStructuresRoute
  | ListOrganismesBySecteurRoute
  | LoginRoute
  | OrganismesRoute
  | RegisterRoute
  | RootRoute
  | SingleOrganismeRoute
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
    name: 'EditDepartementsRoute',
    path: '/edition-departements',
    component: EditDepartementsView,
    role: 'User'
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
    name: 'EditListOrganismesRoute',
    path: '/edition-list-organismes',
    component: ListOrganismesView
  },
  {
    name: 'ListOrganismesBySecteurRoute',
    path: '/organismes-par-secteur/:secteurId',
    component: ListOrganismesBySecteurView
  },
  {
    name: 'LoginRoute',
    path: '/login',
    component: LoginView
  },
  {
    name: 'SingleOrganismeRoute',
    path: '/organisme/:id',
    component: SingleOrganismeView
  },
  {
    name: 'OrganismesRoute',
    path: '/organismes',
    component: OrganismesView
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
    name: 'UsersManagementUserRoute',
    path: '/users-management/:userId',
    component: UsersManagementView,
    role: 'Admin'
  },
  {
    name: 'UsersManagementRoute',
    path: '/users-management',
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

export interface ListOrganismesBySecteurRoute {
  name: 'ListOrganismesBySecteurRoute';
  secteurId: SecteurId;
}

interface EditListOrganismesRoute {
  name: 'EditListOrganismesRoute';
}

interface LoginRoute {
  name: 'LoginRoute';
}

interface OrganismesRoute {
  name: 'OrganismesRoute';
}

interface RegisterRoute {
  name: 'RegisterRoute';
}

interface RootRoute {
  name: 'RootRoute';
}

interface SingleOrganismeRoute {
  name: 'SingleOrganismeRoute';
  id: OrganismeId;
}

export interface UsersManagementRoute {
  name: 'UsersManagementRoute';
}

export interface UsersManagementUserRoute {
  name: 'UsersManagementUserRoute';
  userId: UserId;
}
