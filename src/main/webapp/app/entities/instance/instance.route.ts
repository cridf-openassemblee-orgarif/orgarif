import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Instance } from 'app/shared/model/instance.model';
import { InstanceService } from './instance.service';
import { InstanceComponent } from './instance.component';
import { InstanceDetailComponent } from './instance-detail.component';
import { InstanceUpdateComponent } from './instance-update.component';
import { InstanceDeletePopupComponent } from './instance-delete-dialog.component';
import { IInstance } from 'app/shared/model/instance.model';

@Injectable({ providedIn: 'root' })
export class InstanceResolve implements Resolve<IInstance> {
  constructor(private service: InstanceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInstance> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Instance>) => response.ok),
        map((instance: HttpResponse<Instance>) => instance.body)
      );
    }
    return of(new Instance());
  }
}

export const instanceRoute: Routes = [
  {
    path: '',
    component: InstanceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Instances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InstanceDetailComponent,
    resolve: {
      instance: InstanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Instances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InstanceUpdateComponent,
    resolve: {
      instance: InstanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Instances'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InstanceUpdateComponent,
    resolve: {
      instance: InstanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Instances'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const instancePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: InstanceDeletePopupComponent,
    resolve: {
      instance: InstanceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Instances'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
