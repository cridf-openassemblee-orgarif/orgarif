import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IElu } from 'app/shared/model/elu.model';

type EntityResponseType = HttpResponse<IElu>;
type EntityArrayResponseType = HttpResponse<IElu[]>;

@Injectable({ providedIn: 'root' })
export class EluService {
  public resourceUrl = SERVER_API_URL + 'api/elus';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/elus';

  constructor(protected http: HttpClient) {}

  create(elu: IElu): Observable<EntityResponseType> {
    return this.http.post<IElu>(this.resourceUrl, elu, { observe: 'response' });
  }

  update(elu: IElu): Observable<EntityResponseType> {
    return this.http.put<IElu>(this.resourceUrl, elu, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IElu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IElu[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IElu[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
