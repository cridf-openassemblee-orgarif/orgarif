import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrganisme } from 'app/shared/model/organisme.model';

type EntityResponseType = HttpResponse<IOrganisme>;
type EntityArrayResponseType = HttpResponse<IOrganisme[]>;

@Injectable({ providedIn: 'root' })
export class OrganismeService {
  public resourceUrl = SERVER_API_URL + 'api/organismes';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/organismes';

  constructor(protected http: HttpClient) {}

  create(organisme: IOrganisme): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(organisme);
    return this.http
      .post<IOrganisme>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(organisme: IOrganisme): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(organisme);
    return this.http
      .put<IOrganisme>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrganisme>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrganisme[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrganisme[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(organisme: IOrganisme): IOrganisme {
    const copy: IOrganisme = Object.assign({}, organisme, {
      creationDate: organisme.creationDate != null && organisme.creationDate.isValid() ? organisme.creationDate.toJSON() : null,
      lastModificationDate:
        organisme.lastModificationDate != null && organisme.lastModificationDate.isValid() ? organisme.lastModificationDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
      res.body.lastModificationDate = res.body.lastModificationDate != null ? moment(res.body.lastModificationDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((organisme: IOrganisme) => {
        organisme.creationDate = organisme.creationDate != null ? moment(organisme.creationDate) : null;
        organisme.lastModificationDate = organisme.lastModificationDate != null ? moment(organisme.lastModificationDate) : null;
      });
    }
    return res;
  }
}
