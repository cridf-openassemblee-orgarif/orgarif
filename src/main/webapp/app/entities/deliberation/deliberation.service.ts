import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IDeliberation } from 'app/shared/model/deliberation.model';

type EntityResponseType = HttpResponse<IDeliberation>;
type EntityArrayResponseType = HttpResponse<IDeliberation[]>;

@Injectable({ providedIn: 'root' })
export class DeliberationService {
  public resourceUrl = SERVER_API_URL + 'api/deliberations';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/deliberations';

  constructor(protected http: HttpClient) {}

  create(deliberation: IDeliberation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliberation);
    return this.http
      .post<IDeliberation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(deliberation: IDeliberation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliberation);
    return this.http
      .put<IDeliberation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDeliberation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDeliberation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDeliberation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(deliberation: IDeliberation): IDeliberation {
    const copy: IDeliberation = Object.assign({}, deliberation, {
      date: deliberation.date && deliberation.date.isValid() ? deliberation.date.toJSON() : undefined,
      creationDate: deliberation.creationDate && deliberation.creationDate.isValid() ? deliberation.creationDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
      res.body.creationDate = res.body.creationDate ? moment(res.body.creationDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((deliberation: IDeliberation) => {
        deliberation.date = deliberation.date ? moment(deliberation.date) : undefined;
        deliberation.creationDate = deliberation.creationDate ? moment(deliberation.creationDate) : undefined;
      });
    }
    return res;
  }
}
