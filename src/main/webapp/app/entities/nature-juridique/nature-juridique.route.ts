import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { INatureJuridique, NatureJuridique } from 'app/shared/model/nature-juridique.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { NatureJuridiqueDetailComponent } from './nature-juridique-detail.component';
import { NatureJuridiqueUpdateComponent } from './nature-juridique-update.component';
import { NatureJuridiqueComponent } from './nature-juridique.component';
import { NatureJuridiqueService } from './nature-juridique.service';

@Injectable({ providedIn: 'root' })
export class NatureJuridiqueResolve implements Resolve<INatureJuridique> {
  constructor(private service: NatureJuridiqueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INatureJuridique> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((natureJuridique: HttpResponse<NatureJuridique>) => {
          if (natureJuridique.body) {
            return of(natureJuridique.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
      authorities: [Authority.USER],
      pageTitle: 'NatureJuridiques',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NatureJuridiqueDetailComponent,
    resolve: {
      natureJuridique: NatureJuridiqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'NatureJuridiques',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NatureJuridiqueUpdateComponent,
    resolve: {
      natureJuridique: NatureJuridiqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'NatureJuridiques',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NatureJuridiqueUpdateComponent,
    resolve: {
      natureJuridique: NatureJuridiqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'NatureJuridiques',
    },
    canActivate: [UserRouteAccessService],
  },
];
