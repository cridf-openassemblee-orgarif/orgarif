import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ListComponent } from 'app/list/list.component';

export const LIST_ROUTE: Route = {
  path: 'liste-organismes',
  component: ListComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'Liste des organismes'
  },
  canActivate: [UserRouteAccessService]
};
