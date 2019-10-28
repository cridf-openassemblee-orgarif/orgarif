import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NatureJuridique } from 'app/shared/model/nature-juridique.model';
import { NatureJuridiqueService } from './nature-juridique.service';
import { NatureJuridiqueComponent } from './nature-juridique.component';
import { NatureJuridiqueDetailComponent } from './nature-juridique-detail.component';
import { NatureJuridiqueUpdateComponent } from './nature-juridique-update.component';
import { NatureJuridiqueDeletePopupComponent } from './nature-juridique-delete-dialog.component';
import { INatureJuridique } from 'app/shared/model/nature-juridique.model';

@Injectable({ providedIn: 'root' })
export class NatureJuridiqueResolve implements Resolve<INatureJuridique> {
  constructor(private service: NatureJuridiqueService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INatureJuridique> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NatureJuridique>) => response.ok),
        map((natureJuridique: HttpResponse<NatureJuridique>) => natureJuridique.body)
      );
    }
    return of(new NatureJuridique());
  }
}

export const natureJuridiqueRoute: Routes = [
  {
    path: '',
    component: NatureJuridiqueComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NatureJuridiques'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NatureJuridiqueDetailComponent,
    resolve: {
      natureJuridique: NatureJuridiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NatureJuridiques'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NatureJuridiqueUpdateComponent,
    resolve: {
      natureJuridique: NatureJuridiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NatureJuridiques'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NatureJuridiqueUpdateComponent,
    resolve: {
      natureJuridique: NatureJuridiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NatureJuridiques'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const natureJuridiquePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NatureJuridiqueDeletePopupComponent,
    resolve: {
      natureJuridique: NatureJuridiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NatureJuridiques'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
