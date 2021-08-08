import { FunctionComponent } from 'react';
import { OrganismeId, SecteurId } from '../domain/ids';
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

export type Route =
  | EditNatureJuridiquesRoute
  | EditOrganismeRoute
  | EditSecteursRoute
  | EditTypeStructuresRoute
  | ListOrganismesBySecteurRoute
  | ListOrganismesRoute
  | LoginRoute
  | OrganismeRoute
  | RegisterRoute
  | RootRoute;

type AuthenticationLevel = 'neutral' | 'loggedIn' | 'loggedOut' | 'admin';

interface ViewParameters<R extends Route> {
  routeParams: R;
}

interface RouteProps {
  path: string;
  component: FunctionComponent<ViewParameters<any>>;
  authenticationLevel: AuthenticationLevel;
  onEnter?: () => void;
}

export const routes: Record<Route['name'], RouteProps> = {
  EditNatureJuridiquesRoute: {
    path: '/edition-nature-juridiques',
    component: EditNatureJuridiquesView,
    authenticationLevel: 'loggedIn'
  },
  EditOrganismeRoute: {
    path: '/edition-organisme/:id',
    component: EditOrganismeView,
    authenticationLevel: 'loggedIn'
  },
  EditSecteursRoute: {
    path: '/edition-secteurs',
    component: EditSecteursView,
    authenticationLevel: 'loggedIn'
  },
  EditTypeStructuresRoute: {
    path: '/edition-type-structures',
    component: EditTypeStructuresView,
    authenticationLevel: 'loggedIn'
  },
  ListOrganismesBySecteurRoute: {
    path: '/organismes-par-secteur/:secteurId',
    component: ListOrganismesBySecteurView,
    authenticationLevel: 'loggedOut'
  },
  ListOrganismesRoute: {
    path: '/organismes',
    component: ListOrganismesView,
    authenticationLevel: 'loggedOut'
  },
  LoginRoute: {
    path: '/login',
    component: LoginView,
    authenticationLevel: 'loggedOut'
  },
  OrganismeRoute: {
    path: '/organisme/:id',
    component: OrganismeView,
    authenticationLevel: 'loggedIn'
  },
  RegisterRoute: {
    path: '/register',
    component: RegisterView,
    authenticationLevel: 'loggedOut'
  },
  RootRoute: {
    path: '/',
    component: RootView,
    authenticationLevel: 'neutral'
  }
};

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
