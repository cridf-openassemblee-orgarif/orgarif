import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRepresentant, Representant } from 'app/shared/model/representant.model';
import { RepresentantService } from './representant.service';
import { RepresentantComponent } from './representant.component';
import { RepresentantDetailComponent } from './representant-detail.component';
import { RepresentantUpdateComponent } from './representant-update.component';

@Injectable({ providedIn: 'root' })
export class RepresentantResolve implements Resolve<IRepresentant> {
  constructor(private service: RepresentantService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRepresentant> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((representant: HttpResponse<Representant>) => {
          if (representant.body) {
            return of(representant.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Representant());
  }
}

export const representantRoute: Routes = [
  {
    path: '',
    component: RepresentantComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Representants',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RepresentantDetailComponent,
    resolve: {
      representant: RepresentantResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Representants',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RepresentantUpdateComponent,
    resolve: {
      representant: RepresentantResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Representants',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RepresentantUpdateComponent,
    resolve: {
      representant: RepresentantResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Representants',
    },
    canActivate: [UserRouteAccessService],
  },
];
