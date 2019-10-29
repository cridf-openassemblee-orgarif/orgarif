import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { ISecteur } from 'app/shared/model/secteur.model';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { IElu } from 'app/shared/model/elu.model';
import { createRequestOption } from 'app/shared/util/request-util';
import 'rxjs-compat/add/operator/map';

type EntityResponseType = HttpResponse<ISecteur>;
type EntityArrayResponseType = HttpResponse<ISecteur[]>;

@Injectable({ providedIn: 'root' })
export class ListService {
  public resourceUrl = SERVER_API_URL + 'api/list';

  constructor(protected http: HttpClient) {}

  lastOrganismes(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrganisme[]>(this.resourceUrl + '/last-organismes', { params: options, observe: 'response' });
  }

  getElus(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IElu[]>(this.resourceUrl + '/elus', { params: options, observe: 'response' });
  }
}
