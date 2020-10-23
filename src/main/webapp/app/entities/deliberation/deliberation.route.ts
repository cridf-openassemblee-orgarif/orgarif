import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDeliberation, Deliberation } from 'app/shared/model/deliberation.model';
import { DeliberationService } from './deliberation.service';
import { DeliberationComponent } from './deliberation.component';
import { DeliberationDetailComponent } from './deliberation-detail.component';
import { DeliberationUpdateComponent } from './deliberation-update.component';

@Injectable({ providedIn: 'root' })
export class DeliberationResolve implements Resolve<IDeliberation> {
  constructor(private service: DeliberationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeliberation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((deliberation: HttpResponse<Deliberation>) => {
          if (deliberation.body) {
            return of(deliberation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Deliberation());
  }
}

export const deliberationRoute: Routes = [
  {
    path: '',
    component: DeliberationComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Deliberations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliberationDetailComponent,
    resolve: {
      deliberation: DeliberationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Deliberations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliberationUpdateComponent,
    resolve: {
      deliberation: DeliberationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Deliberations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliberationUpdateComponent,
    resolve: {
      deliberation: DeliberationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Deliberations',
    },
    canActivate: [UserRouteAccessService],
  },
];
