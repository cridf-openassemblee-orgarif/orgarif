import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { ITypeStructure } from 'app/shared/model/type-structure.model';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ITypeStructure>;
type EntityArrayResponseType = HttpResponse<ITypeStructure[]>;

@Injectable({ providedIn: 'root' })
export class TypeStructureService {
  public resourceUrl = SERVER_API_URL + 'api/type-structures';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/type-structures';

  constructor(protected http: HttpClient) {}

  create(typeStructure: ITypeStructure): Observable<EntityResponseType> {
    return this.http.post<ITypeStructure>(this.resourceUrl, typeStructure, { observe: 'response' });
  }

  update(typeStructure: ITypeStructure): Observable<EntityResponseType> {
    return this.http.put<ITypeStructure>(this.resourceUrl, typeStructure, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeStructure>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeStructure[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeStructure[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
