import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IInstance } from 'app/shared/model/instance.model';

type EntityResponseType = HttpResponse<IInstance>;
type EntityArrayResponseType = HttpResponse<IInstance[]>;

@Injectable({ providedIn: 'root' })
export class InstanceService {
  public resourceUrl = SERVER_API_URL + 'api/instances';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/instances';

  constructor(protected http: HttpClient) {}

  create(instance: IInstance): Observable<EntityResponseType> {
    return this.http.post<IInstance>(this.resourceUrl, instance, { observe: 'response' });
  }

  update(instance: IInstance): Observable<EntityResponseType> {
    return this.http.put<IInstance>(this.resourceUrl, instance, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInstance>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstance[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstance[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
