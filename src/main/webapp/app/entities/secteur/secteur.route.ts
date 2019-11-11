import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Secteur } from 'app/shared/model/secteur.model';
import { SecteurService } from './secteur.service';
import { SecteurComponent } from './secteur.component';
import { SecteurDetailComponent } from './secteur-detail.component';
import { SecteurUpdateComponent } from './secteur-update.component';
import { SecteurDeletePopupComponent } from './secteur-delete-dialog.component';
import { ISecteur } from 'app/shared/model/secteur.model';

@Injectable({ providedIn: 'root' })
export class SecteurResolve implements Resolve<ISecteur> {
  constructor(private service: SecteurService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISecteur> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Secteur>) => response.ok),
        map((secteur: HttpResponse<Secteur>) => secteur.body)
      );
    }
    return of(new Secteur());
  }
}

export const secteurRoute: Routes = [
  {
    path: '',
    component: SecteurComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Secteurs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SecteurDetailComponent,
    resolve: {
      secteur: SecteurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Secteurs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SecteurUpdateComponent,
    resolve: {
      secteur: SecteurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Secteurs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SecteurUpdateComponent,
    resolve: {
      secteur: SecteurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Secteurs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const secteurPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SecteurDeletePopupComponent,
    resolve: {
      secteur: SecteurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Secteurs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
