import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { IInstance, Instance } from 'app/shared/model/instance.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { InstanceDetailComponent } from './instance-detail.component';
import { InstanceUpdateComponent } from './instance-update.component';
import { InstanceComponent } from './instance.component';
import { InstanceService } from './instance.service';

@Injectable({ providedIn: 'root' })
export class InstanceResolve implements Resolve<IInstance> {
  constructor(private service: InstanceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInstance> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((instance: HttpResponse<Instance>) => {
          if (instance.body) {
            return of(instance.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Instance());
  }
}

export const instanceRoute: Routes = [
  {
    path: '',
    component: InstanceComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Instances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InstanceDetailComponent,
    resolve: {
      instance: InstanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Instances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InstanceUpdateComponent,
    resolve: {
      instance: InstanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Instances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InstanceUpdateComponent,
    resolve: {
      instance: InstanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Instances',
    },
    canActivate: [UserRouteAccessService],
  },
];
