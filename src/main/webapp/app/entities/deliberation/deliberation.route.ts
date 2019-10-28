import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Deliberation } from 'app/shared/model/deliberation.model';
import { DeliberationService } from './deliberation.service';
import { DeliberationComponent } from './deliberation.component';
import { DeliberationDetailComponent } from './deliberation-detail.component';
import { DeliberationUpdateComponent } from './deliberation-update.component';
import { DeliberationDeletePopupComponent } from './deliberation-delete-dialog.component';
import { IDeliberation } from 'app/shared/model/deliberation.model';

@Injectable({ providedIn: 'root' })
export class DeliberationResolve implements Resolve<IDeliberation> {
  constructor(private service: DeliberationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDeliberation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Deliberation>) => response.ok),
        map((deliberation: HttpResponse<Deliberation>) => deliberation.body)
      );
    }
    return of(new Deliberation());
  }
}

export const deliberationRoute: Routes = [
  {
    path: '',
    component: DeliberationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Deliberations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DeliberationDetailComponent,
    resolve: {
      deliberation: DeliberationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Deliberations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DeliberationUpdateComponent,
    resolve: {
      deliberation: DeliberationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Deliberations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DeliberationUpdateComponent,
    resolve: {
      deliberation: DeliberationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Deliberations'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const deliberationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DeliberationDeletePopupComponent,
    resolve: {
      deliberation: DeliberationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Deliberations'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
