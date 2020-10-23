import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISecteur, Secteur } from 'app/shared/model/secteur.model';
import { SecteurService } from './secteur.service';
import { SecteurComponent } from './secteur.component';
import { SecteurDetailComponent } from './secteur-detail.component';
import { SecteurUpdateComponent } from './secteur-update.component';

@Injectable({ providedIn: 'root' })
export class SecteurResolve implements Resolve<ISecteur> {
  constructor(private service: SecteurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISecteur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((secteur: HttpResponse<Secteur>) => {
          if (secteur.body) {
            return of(secteur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
      authorities: [Authority.USER],
      pageTitle: 'Secteurs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SecteurDetailComponent,
    resolve: {
      secteur: SecteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Secteurs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SecteurUpdateComponent,
    resolve: {
      secteur: SecteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Secteurs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SecteurUpdateComponent,
    resolve: {
      secteur: SecteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Secteurs',
    },
    canActivate: [UserRouteAccessService],
  },
];
