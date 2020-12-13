import { FunctionComponent } from 'react';
import { OrganismeId, SecteurId } from '../domain/id';
import { EditOrganismeView } from '../view/EditOrganismeView';
import { ListOrganismesBySecteurView } from '../view/ListOrganismesBySecteurView';
import { ListOrganismesView } from '../view/ListOrganismesView';
import { LoginView } from '../view/LoginView';
import { OrganismeView } from '../view/OrganismeView';
import { RegisterView } from '../view/RegisterView';
import { RootView } from '../view/RootView';

export type Route =
  | EditOrganismeRoute
  | ListOrganismesBySecteurRoute
  | ListOrganismesRoute
  | LoginRoute
  | OrganismeRoute
  | RegisterRoute
  | RootRoute;

type AuthenticationLevel = 'neutral' | 'loggedIn' | 'loggedOut' | 'admin';

interface RouteProps {
  path: string;
  component: FunctionComponent<any>;
  authenticationLevel: AuthenticationLevel;
  onEnter?: () => void;
}

export const routes: Record<Route['name'], RouteProps> = {
  EditOrganismeRoute: {
    path: '/edition-organisme/:id',
    component: EditOrganismeView,
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

export interface EditOrganismeRoute {
  name: 'EditOrganismeRoute';
  id: OrganismeId;
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
