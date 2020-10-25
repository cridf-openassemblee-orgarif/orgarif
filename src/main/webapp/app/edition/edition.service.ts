import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { ISecteur } from 'app/shared/model/secteur.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ISecteur>;
type EntityArrayResponseType = HttpResponse<ISecteur[]>;

@Injectable({ providedIn: 'root' })
export class EditionService {
  public resourceUrl = SERVER_API_URL + 'api/edition';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    console.log(id);
    return this.http.get<IOrganisme>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
