import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { Deliberation, IDeliberation } from 'app/shared/model/deliberation.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { DeliberationDetailComponent } from './deliberation-detail.component';
import { DeliberationUpdateComponent } from './deliberation-update.component';
import { DeliberationComponent } from './deliberation.component';
import { DeliberationService } from './deliberation.service';

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
