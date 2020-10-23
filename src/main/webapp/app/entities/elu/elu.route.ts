import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IElu, Elu } from 'app/shared/model/elu.model';
import { EluService } from './elu.service';
import { EluComponent } from './elu.component';
import { EluDetailComponent } from './elu-detail.component';
import { EluUpdateComponent } from './elu-update.component';

@Injectable({ providedIn: 'root' })
export class EluResolve implements Resolve<IElu> {
  constructor(private service: EluService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IElu> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((elu: HttpResponse<Elu>) => {
          if (elu.body) {
            return of(elu.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Elu());
  }
}

export const eluRoute: Routes = [
  {
    path: '',
    component: EluComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Elus',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EluDetailComponent,
    resolve: {
      elu: EluResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Elus',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EluUpdateComponent,
    resolve: {
      elu: EluResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Elus',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EluUpdateComponent,
    resolve: {
      elu: EluResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Elus',
    },
    canActivate: [UserRouteAccessService],
  },
];
