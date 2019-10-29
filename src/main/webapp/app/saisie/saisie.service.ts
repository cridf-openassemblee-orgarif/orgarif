import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { IDeliberation } from 'app/shared/model/deliberation.model';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { ISecteur } from 'app/shared/model/secteur.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ISecteur>;
type EntityArrayResponseType = HttpResponse<ISecteur[]>;

@Injectable({ providedIn: 'root' })
export class SaisieService {
  public resourceUrl = SERVER_API_URL + 'api/saisie';

  constructor(protected http: HttpClient) {}

  create(organisme: IOrganisme): Observable<EntityResponseType> {
    return this.http.post<IOrganisme>(this.resourceUrl, organisme, { observe: 'response' });
  }

  update(organisme: IOrganisme): Observable<EntityResponseType> {
    return this.http.put<IOrganisme>(this.resourceUrl, organisme, { observe: 'response' });
  }

  lastDeliberations(): Observable<EntityArrayResponseType> {
    return this.http.get<IDeliberation[]>(this.resourceUrl + '/last-deliberations', { observe: 'response' });
  }
}
