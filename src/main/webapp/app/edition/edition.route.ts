import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { EditionComponent } from 'app/edition/edition.component';
import { ListService } from 'app/list/list.service';
import { IOrganisme, Organisme } from 'app/shared/model/organisme.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditionResolve implements Resolve<IOrganisme | undefined> {
  constructor(private listService: ListService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrganisme | undefined> {
    const id = route.params['id'];
    if (id) {
      return this.listService.getOrganisme(id);
    }
    return of(new Organisme());
  }
}

export const EDITION_ROUTE: Route = {
  path: 'edition/:id',
  component: EditionComponent,
  resolve: {
    organisme: EditionResolve,
  },
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'Edition organisme',
  },
  canActivate: [UserRouteAccessService],
};
