import { FunctionComponent } from 'react';
import { OrganismeId, SecteurId, UserId } from '../domain/ids';
import { Role } from '../domain/user';
import { EditNatureJuridiquesView } from '../view/EditNatureJuridiquesView';
import { EditOrganismeView } from '../view/EditOrganismeView';
import { EditSecteursView } from '../view/EditSecteursView';
import { EditTypeStructuresView } from '../view/EditTypeStructuresView';
import { ListOrganismesBySecteurView } from '../view/ListOrganismesBySecteurView';
import { ListOrganismesView } from '../view/ListOrganismesView';
import { LoginView } from '../view/LoginView';
import { OrganismeView } from '../view/OrganismeView';
import { RegisterView } from '../view/RegisterView';
import { RootView } from '../view/RootView';
import { EditDepartementsView } from '../view/EditDepartementsView';
import { UsersManagementView } from '../view/UsersManagementView';
import { UserManagementView } from '../view/UserManagementView';

// TODO secure that "name" can't be a route parameter
export type ApplicationRoute =
  | EditDepartementsRoute
  | EditNatureJuridiquesRoute
  | EditOrganismeRoute
  | EditSecteursRoute
  | EditTypeStructuresRoute
  | ListOrganismesBySecteurRoute
  | ListOrganismesRoute
  | LoginRoute
  | OrganismeRoute
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
  EditDepartementsRoute: {
    path: '/edition-departements',
    component: EditDepartementsView,
    role: 'user'
  },
  EditNatureJuridiquesRoute: {
    path: '/edition-nature-juridiques',
    component: EditNatureJuridiquesView,
    role: 'user'
  },
  EditOrganismeRoute: {
    path: '/edition-organisme/:id',
    component: EditOrganismeView,
    role: 'user'
  },
  EditSecteursRoute: {
    path: '/edition-secteurs',
    component: EditSecteursView,
    role: 'user'
  },
  EditTypeStructuresRoute: {
    path: '/edition-type-structures',
    component: EditTypeStructuresView,
    role: 'user'
  },
  ListOrganismesBySecteurRoute: {
    path: '/organismes-par-secteur/:secteurId',
    component: ListOrganismesBySecteurView
  },
  ListOrganismesRoute: {
    path: '/organismes',
    component: ListOrganismesView
  },
  LoginRoute: {
    path: '/login',
    component: LoginView
  },
  OrganismeRoute: {
    path: '/organisme/:id',
    component: OrganismeView
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

export interface EditDepartementsRoute {
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

export interface UserManagementRoute {
  name: 'UserManagementRoute';
  userId: UserId;
}

interface UsersManagementRoute {
  name: 'UsersManagementRoute';
}
