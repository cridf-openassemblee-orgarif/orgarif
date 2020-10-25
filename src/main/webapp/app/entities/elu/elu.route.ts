import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { Elu, IElu } from 'app/shared/model/elu.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { EluDetailComponent } from './elu-detail.component';
import { EluUpdateComponent } from './elu-update.component';
import { EluComponent } from './elu.component';
import { EluService } from './elu.service';

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
