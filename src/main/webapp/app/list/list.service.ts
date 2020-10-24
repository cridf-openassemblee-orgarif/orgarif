import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { IElu } from 'app/shared/model/elu.model';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { createRequestOption } from 'app/shared/util/request-util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ListService {
  public resourceUrl = SERVER_API_URL + 'api/list';

  constructor(protected http: HttpClient) {}

  getLastOrganismes(req?: any): Observable<IOrganisme[]> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrganisme[]>(this.resourceUrl + '/organismes/last', { params: options, observe: 'response' })
      .pipe(map(r => r.body ?? []));
  }

  getOrganisme(id: number): Observable<IOrganisme | undefined> {
    return this.http
      .get<IOrganisme>(this.resourceUrl + '/organismes/' + id, { observe: 'response' })
      .pipe(map(r => r.body ?? undefined));
  }

  getElus(req?: any): Observable<IElu[]> {
    const options = createRequestOption(req);
    return this.http
      .get<IElu[]>(this.resourceUrl + '/elus', { params: options, observe: 'response' })
      .pipe(map(r => r.body ?? []));
  }
}
