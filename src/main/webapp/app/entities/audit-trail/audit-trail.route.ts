import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuditTrail } from 'app/shared/model/audit-trail.model';
import { AuditTrailService } from './audit-trail.service';
import { AuditTrailComponent } from './audit-trail.component';
import { AuditTrailDetailComponent } from './audit-trail-detail.component';
import { AuditTrailUpdateComponent } from './audit-trail-update.component';
import { AuditTrailDeletePopupComponent } from './audit-trail-delete-dialog.component';
import { IAuditTrail } from 'app/shared/model/audit-trail.model';

@Injectable({ providedIn: 'root' })
export class AuditTrailResolve implements Resolve<IAuditTrail> {
  constructor(private service: AuditTrailService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAuditTrail> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AuditTrail>) => response.ok),
        map((auditTrail: HttpResponse<AuditTrail>) => auditTrail.body)
      );
    }
    return of(new AuditTrail());
  }
}

export const auditTrailRoute: Routes = [
  {
    path: '',
    component: AuditTrailComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'AuditTrails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AuditTrailDetailComponent,
    resolve: {
      auditTrail: AuditTrailResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AuditTrails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AuditTrailUpdateComponent,
    resolve: {
      auditTrail: AuditTrailResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AuditTrails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AuditTrailUpdateComponent,
    resolve: {
      auditTrail: AuditTrailResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AuditTrails'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const auditTrailPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AuditTrailDeletePopupComponent,
    resolve: {
      auditTrail: AuditTrailResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AuditTrails'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
