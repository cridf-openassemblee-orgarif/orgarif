import { Route } from '@angular/router';
import { SaisieComponent } from 'app/saisie/saisie.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const SAISIE_ROUTE: Route = {
  path: 'saisie',
  component: SaisieComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'Saisie des organismes'
  },
  canActivate: [UserRouteAccessService]
};
