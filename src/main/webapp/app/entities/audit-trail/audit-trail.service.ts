import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IAuditTrail } from 'app/shared/model/audit-trail.model';

type EntityResponseType = HttpResponse<IAuditTrail>;
type EntityArrayResponseType = HttpResponse<IAuditTrail[]>;

@Injectable({ providedIn: 'root' })
export class AuditTrailService {
  public resourceUrl = SERVER_API_URL + 'api/audit-trails';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/audit-trails';

  constructor(protected http: HttpClient) {}

  create(auditTrail: IAuditTrail): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(auditTrail);
    return this.http
      .post<IAuditTrail>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(auditTrail: IAuditTrail): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(auditTrail);
    return this.http
      .put<IAuditTrail>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAuditTrail>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAuditTrail[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAuditTrail[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(auditTrail: IAuditTrail): IAuditTrail {
    const copy: IAuditTrail = Object.assign({}, auditTrail, {
      date: auditTrail.date && auditTrail.date.isValid() ? auditTrail.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((auditTrail: IAuditTrail) => {
        auditTrail.date = auditTrail.date ? moment(auditTrail.date) : undefined;
      });
    }
    return res;
  }
}
