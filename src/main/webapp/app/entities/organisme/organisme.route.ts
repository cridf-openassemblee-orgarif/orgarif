import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Organisme } from 'app/shared/model/organisme.model';
import { OrganismeService } from './organisme.service';
import { OrganismeComponent } from './organisme.component';
import { OrganismeDetailComponent } from './organisme-detail.component';
import { OrganismeUpdateComponent } from './organisme-update.component';
import { OrganismeDeletePopupComponent } from './organisme-delete-dialog.component';
import { IOrganisme } from 'app/shared/model/organisme.model';

@Injectable({ providedIn: 'root' })
export class OrganismeResolve implements Resolve<IOrganisme> {
  constructor(private service: OrganismeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrganisme> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Organisme>) => response.ok),
        map((organisme: HttpResponse<Organisme>) => organisme.body)
      );
    }
    return of(new Organisme());
  }
}

export const organismeRoute: Routes = [
  {
    path: '',
    component: OrganismeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Organismes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrganismeDetailComponent,
    resolve: {
      organisme: OrganismeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organismes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrganismeUpdateComponent,
    resolve: {
      organisme: OrganismeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organismes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrganismeUpdateComponent,
    resolve: {
      organisme: OrganismeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organismes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const organismePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrganismeDeletePopupComponent,
    resolve: {
      organisme: OrganismeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organismes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
