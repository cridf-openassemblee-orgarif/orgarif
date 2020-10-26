import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { EditionComponent } from 'app/edition/edition.component';
import { ListService } from 'app/list/list.service';
import { IElu } from 'app/shared/model/elu.model';
import { IOrganisme, Organisme } from 'app/shared/model/organisme.model';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EditionData {
  organisme: IOrganisme;
  elus: IElu[];
}

@Injectable({ providedIn: 'root' })
export class EditionResolve implements Resolve<EditionData | undefined> {
  constructor(private listService: ListService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EditionData | undefined> {
    const id = route.params['id'];
    if (id) {
      return forkJoin([this.listService.getOrganisme(id), this.listService.getElus()]).pipe(
        map(([o, e]) => ({
          organisme: o ?? new Organisme(),
          elus: e,
        }))
      );
    }
    return this.listService.getElus().pipe(
      map(e => ({
        organisme: new Organisme(),
        elus: e,
      }))
    );
  }
}

export const EDITION_ROUTE: Route = {
  path: 'edition/:id',
  component: EditionComponent,
  resolve: {
    data: EditionResolve,
  },
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'Edition organisme',
  },
  canActivate: [UserRouteAccessService],
};
