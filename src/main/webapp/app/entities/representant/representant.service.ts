import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { IRepresentant } from 'app/shared/model/representant.model';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IRepresentant>;
type EntityArrayResponseType = HttpResponse<IRepresentant[]>;

@Injectable({ providedIn: 'root' })
export class RepresentantService {
  public resourceUrl = SERVER_API_URL + 'api/representants';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/representants';

  constructor(protected http: HttpClient) {}

  create(representant: IRepresentant): Observable<EntityResponseType> {
    return this.http.post<IRepresentant>(this.resourceUrl, representant, { observe: 'response' });
  }

  update(representant: IRepresentant): Observable<EntityResponseType> {
    return this.http.put<IRepresentant>(this.resourceUrl, representant, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRepresentant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRepresentant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRepresentant[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
