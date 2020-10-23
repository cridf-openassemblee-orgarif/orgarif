import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAuditTrail, AuditTrail } from 'app/shared/model/audit-trail.model';
import { AuditTrailService } from './audit-trail.service';
import { AuditTrailComponent } from './audit-trail.component';
import { AuditTrailDetailComponent } from './audit-trail-detail.component';
import { AuditTrailUpdateComponent } from './audit-trail-update.component';

@Injectable({ providedIn: 'root' })
export class AuditTrailResolve implements Resolve<IAuditTrail> {
  constructor(private service: AuditTrailService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAuditTrail> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((auditTrail: HttpResponse<AuditTrail>) => {
          if (auditTrail.body) {
            return of(auditTrail.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AuditTrail());
  }
}

export const auditTrailRoute: Routes = [
  {
    path: '',
    component: AuditTrailComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AuditTrails',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AuditTrailDetailComponent,
    resolve: {
      auditTrail: AuditTrailResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AuditTrails',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AuditTrailUpdateComponent,
    resolve: {
      auditTrail: AuditTrailResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AuditTrails',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AuditTrailUpdateComponent,
    resolve: {
      auditTrail: AuditTrailResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AuditTrails',
    },
    canActivate: [UserRouteAccessService],
  },
];
