import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Elu } from 'app/shared/model/elu.model';
import { RepresentantOrSuppleant } from 'app/shared/model/misc.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRepresentant, Representant } from '../shared/model/representant.model';

@Injectable({ providedIn: 'root' })
export class EditionService {
  public resourceUrl = SERVER_API_URL + 'api/edition';

  constructor(protected http: HttpClient) {}

  moveRepresentant(representant: Representant, newPosition: number): Observable<IRepresentant[]> {
    return this.http
      .put<IRepresentant[]>(`${this.resourceUrl}/moveRepresentant`, { representant, newPosition }, { observe: 'response' })
      .pipe(map((res: HttpResponse<IRepresentant[]>) => res.body!));
  }

  addElu(
    elu: Elu,
    organismeId: number | undefined,
    instanceId: number | undefined,
    representantOrSuppleant: RepresentantOrSuppleant
  ): Observable<IRepresentant[]> {
    return this.http
      .put<IRepresentant[]>(
        `${this.resourceUrl}/addRepresentant`,
        {
          elu,
          organismeId,
          instanceId,
          representantOrSuppleant,
        },
        { observe: 'response' }
      )
      .pipe(map((res: HttpResponse<IRepresentant[]>) => res.body!));
  }

  delete(representant: IRepresentant): Observable<IRepresentant[]> {
    return this.http
      .put<IRepresentant[]>(`${this.resourceUrl}/deleteRepresentant`, representant, { observe: 'response' })
      .pipe(map((res: HttpResponse<IRepresentant[]>) => res.body!));
  }
}
