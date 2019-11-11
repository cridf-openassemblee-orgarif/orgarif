import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Representant } from 'app/shared/model/representant.model';
import { RepresentantService } from './representant.service';
import { RepresentantComponent } from './representant.component';
import { RepresentantDetailComponent } from './representant-detail.component';
import { RepresentantUpdateComponent } from './representant-update.component';
import { RepresentantDeletePopupComponent } from './representant-delete-dialog.component';
import { IRepresentant } from 'app/shared/model/representant.model';

@Injectable({ providedIn: 'root' })
export class RepresentantResolve implements Resolve<IRepresentant> {
  constructor(private service: RepresentantService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRepresentant> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Representant>) => response.ok),
        map((representant: HttpResponse<Representant>) => representant.body)
      );
    }
    return of(new Representant());
  }
}

export const representantRoute: Routes = [
  {
    path: '',
    component: RepresentantComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Representants'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RepresentantDetailComponent,
    resolve: {
      representant: RepresentantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Representants'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RepresentantUpdateComponent,
    resolve: {
      representant: RepresentantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Representants'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RepresentantUpdateComponent,
    resolve: {
      representant: RepresentantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Representants'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const representantPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RepresentantDeletePopupComponent,
    resolve: {
      representant: RepresentantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Representants'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
