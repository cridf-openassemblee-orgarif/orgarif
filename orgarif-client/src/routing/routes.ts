import { FunctionComponent } from 'react';
import { OrganismeId } from '../domain/id';
import { EditOrganismeView } from '../view/EditOrganismeView';
import { ListOrganismesView } from '../view/ListOrganismesView';
import { LoginView } from '../view/LoginView';
import { RegisterView } from '../view/RegisterView';
import { RootView } from '../view/RootView';

export type Route =
  | EditOrganismeRoute
  | ListOrganismesRoute
  | LoginRoute
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
    authenticationLevel: 'loggedIn',
  },
  ListOrganismesRoute: {
    path: '/organismes',
    component: ListOrganismesView,
    authenticationLevel: 'loggedOut',
  },
  LoginRoute: {
    path: '/login',
    component: LoginView,
    authenticationLevel: 'loggedOut',
  },
  RegisterRoute: {
    path: '/register',
    component: RegisterView,
    authenticationLevel: 'loggedOut',
  },
  RootRoute: {
    path: '/',
    component: RootView,
    authenticationLevel: 'neutral',
  },
};

export interface EditOrganismeRoute {
  name: 'EditOrganismeRoute';
  id: OrganismeId;
}

interface ListOrganismesRoute {
  name: 'ListOrganismesRoute';
}

interface LoginRoute {
  name: 'LoginRoute';
}

interface RegisterRoute {
  name: 'RegisterRoute';
}

interface RootRoute {
  name: 'RootRoute';
}