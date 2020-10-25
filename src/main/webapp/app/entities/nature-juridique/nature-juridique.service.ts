import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { INatureJuridique } from 'app/shared/model/nature-juridique.model';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<INatureJuridique>;
type EntityArrayResponseType = HttpResponse<INatureJuridique[]>;

@Injectable({ providedIn: 'root' })
export class NatureJuridiqueService {
  public resourceUrl = SERVER_API_URL + 'api/nature-juridiques';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/nature-juridiques';

  constructor(protected http: HttpClient) {}

  create(natureJuridique: INatureJuridique): Observable<EntityResponseType> {
    return this.http.post<INatureJuridique>(this.resourceUrl, natureJuridique, { observe: 'response' });
  }

  update(natureJuridique: INatureJuridique): Observable<EntityResponseType> {
    return this.http.put<INatureJuridique>(this.resourceUrl, natureJuridique, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INatureJuridique>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INatureJuridique[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INatureJuridique[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
