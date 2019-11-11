import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TypeStructure } from 'app/shared/model/type-structure.model';
import { TypeStructureService } from './type-structure.service';
import { TypeStructureComponent } from './type-structure.component';
import { TypeStructureDetailComponent } from './type-structure-detail.component';
import { TypeStructureUpdateComponent } from './type-structure-update.component';
import { TypeStructureDeletePopupComponent } from './type-structure-delete-dialog.component';
import { ITypeStructure } from 'app/shared/model/type-structure.model';

@Injectable({ providedIn: 'root' })
export class TypeStructureResolve implements Resolve<ITypeStructure> {
  constructor(private service: TypeStructureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITypeStructure> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TypeStructure>) => response.ok),
        map((typeStructure: HttpResponse<TypeStructure>) => typeStructure.body)
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
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeStructures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TypeStructureDetailComponent,
    resolve: {
      typeStructure: TypeStructureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeStructures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TypeStructureUpdateComponent,
    resolve: {
      typeStructure: TypeStructureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeStructures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TypeStructureUpdateComponent,
    resolve: {
      typeStructure: TypeStructureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeStructures'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const typeStructurePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TypeStructureDeletePopupComponent,
    resolve: {
      typeStructure: TypeStructureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeStructures'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
