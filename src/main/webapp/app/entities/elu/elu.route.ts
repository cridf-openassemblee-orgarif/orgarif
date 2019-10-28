import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Elu } from 'app/shared/model/elu.model';
import { EluService } from './elu.service';
import { EluComponent } from './elu.component';
import { EluDetailComponent } from './elu-detail.component';
import { EluUpdateComponent } from './elu-update.component';
import { EluDeletePopupComponent } from './elu-delete-dialog.component';
import { IElu } from 'app/shared/model/elu.model';

@Injectable({ providedIn: 'root' })
export class EluResolve implements Resolve<IElu> {
  constructor(private service: EluService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IElu> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Elu>) => response.ok),
        map((elu: HttpResponse<Elu>) => elu.body)
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
      authorities: ['ROLE_USER'],
      pageTitle: 'Elus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EluDetailComponent,
    resolve: {
      elu: EluResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Elus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EluUpdateComponent,
    resolve: {
      elu: EluResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Elus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EluUpdateComponent,
    resolve: {
      elu: EluResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Elus'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const eluPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EluDeletePopupComponent,
    resolve: {
      elu: EluResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Elus'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
