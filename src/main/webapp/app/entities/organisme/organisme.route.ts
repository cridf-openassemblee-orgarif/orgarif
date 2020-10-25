import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { IOrganisme, Organisme } from 'app/shared/model/organisme.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { OrganismeDetailComponent } from './organisme-detail.component';
import { OrganismeUpdateComponent } from './organisme-update.component';
import { OrganismeComponent } from './organisme.component';
import { OrganismeService } from './organisme.service';

@Injectable({ providedIn: 'root' })
export class OrganismeResolve implements Resolve<IOrganisme> {
  constructor(private service: OrganismeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrganisme> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((organisme: HttpResponse<Organisme>) => {
          if (organisme.body) {
            return of(organisme.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Organisme());
  }
}

export const organismeRoute: Routes = [
  {
    path: '',
    component: OrganismeComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Organismes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrganismeDetailComponent,
    resolve: {
      organisme: OrganismeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Organismes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrganismeUpdateComponent,
    resolve: {
      organisme: OrganismeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Organismes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrganismeUpdateComponent,
    resolve: {
      organisme: OrganismeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Organismes',
    },
    canActivate: [UserRouteAccessService],
  },
];
