// conflict : deleted in template
import { FunctionComponent } from 'react';
import { OrganismeId, SecteurId, UserId } from '../domain/ids';
import { Role } from '../domain/user';
import { EditDepartementsView } from '../view/EditDepartementsView';
import { EditNatureJuridiquesView } from '../view/EditNatureJuridiquesView';
import { EditOrganismeView } from '../view/EditOrganismeView';
import { EditSecteursView } from '../view/EditSecteursView';
import { EditTypeStructuresView } from '../view/EditTypeStructuresView';
import { ListOrganismesBySecteurView } from '../view/ListOrganismesBySecteurView';
import { ListOrganismesView } from '../view/ListOrganismesView';
import { LoginView } from '../view/LoginView';
import { OrganismesView } from '../view/OrganismesView';
import { RegisterView } from '../view/RegisterView';
import { RootView } from '../view/RootView';
import { SingleOrganismeView } from '../view/SingleOrganismeView';
import { UserManagementView } from '../view/UserManagementView';
import { UsersManagementView } from '../view/UsersManagementView';

// TODO secure that "name" can't be a route parameter
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
    path: '/organisme/:id/edit',
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
  EditListOrganismesRoute: {
    path: '/edition-list-organismes',
    component: ListOrganismesView
  },
  ListOrganismesBySecteurRoute: {
    path: '/organismes-par-secteur/:secteurId',
    component: ListOrganismesBySecteurView
  },
  LoginRoute: {
    path: '/login',
    component: LoginView
  },
  SingleOrganismeRoute: {
    path: '/organisme/:id',
    component: SingleOrganismeView
  },
  OrganismesRoute: {
    path: '/organismes',
    component: OrganismesView
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
export interface UserManagementRoute {
  name: 'UserManagementRoute';
  userId: UserId;
}

interface UsersManagementRoute {
  name: 'UsersManagementRoute';
}
