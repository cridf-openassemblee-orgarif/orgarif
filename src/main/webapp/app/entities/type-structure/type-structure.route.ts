import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITypeStructure, TypeStructure } from 'app/shared/model/type-structure.model';
import { TypeStructureService } from './type-structure.service';
import { TypeStructureComponent } from './type-structure.component';
import { TypeStructureDetailComponent } from './type-structure-detail.component';
import { TypeStructureUpdateComponent } from './type-structure-update.component';

@Injectable({ providedIn: 'root' })
export class TypeStructureResolve implements Resolve<ITypeStructure> {
  constructor(private service: TypeStructureService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeStructure> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((typeStructure: HttpResponse<TypeStructure>) => {
          if (typeStructure.body) {
            return of(typeStructure.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TypeStructure());
  }
}

export const typeStructureRoute: Routes = [
  {
    path: '',
    component: TypeStructureComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TypeStructures',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeStructureDetailComponent,
    resolve: {
      typeStructure: TypeStructureResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TypeStructures',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeStructureUpdateComponent,
    resolve: {
      typeStructure: TypeStructureResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TypeStructures',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeStructureUpdateComponent,
    resolve: {
      typeStructure: TypeStructureResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TypeStructures',
    },
    canActivate: [UserRouteAccessService],
  },
];
