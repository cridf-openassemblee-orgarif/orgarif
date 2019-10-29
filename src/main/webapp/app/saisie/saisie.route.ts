import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SaisieComponent } from 'app/saisie/saisie.component';

export const SAISIE_ROUTE: Route = {
  path: 'saisie',
  component: SaisieComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'Saisie des organismes',
  },
  canActivate: [UserRouteAccessService],
};
