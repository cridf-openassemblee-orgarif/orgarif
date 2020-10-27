import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { IDeliberation } from 'app/shared/model/deliberation.model';
import { Elu } from 'app/shared/model/elu.model';
import { RepresentantOrSuppleant } from 'app/shared/model/misc.model';
import { CompleterData, CompleterService } from 'ng2-completer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRepresentant, Representant } from '../shared/model/representant.model';

@Injectable({ providedIn: 'root' })
export class EditionService {
  public resourceUrl = SERVER_API_URL + 'api/edition';

  public deliberationsDataService: CompleterData;

  constructor(protected http: HttpClient, protected completerService: CompleterService) {
    this.deliberationsDataService = completerService.remote(`${this.resourceUrl}/search-deliberations/`, 'label', 'label');
  }

  moveRepresentant(representant: Representant, newPosition: number): Observable<IRepresentant[]> {
    return this.http
      .put<IRepresentant[]>(`${this.resourceUrl}/move-representant`, { representant, newPosition }, { observe: 'response' })
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
        `${this.resourceUrl}/add-representant`,
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
      .put<IRepresentant[]>(`${this.resourceUrl}/delete-representant`, representant, { observe: 'response' })
      .pipe(map((res: HttpResponse<IRepresentant[]>) => res.body!));
  }

  searchDeliberation(searchDeliberation: string): Observable<IDeliberation[]> {
    return this.http
      .get<IDeliberation[]>(`${this.resourceUrl}/search-deliberations/${searchDeliberation}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<IDeliberation[]>) => res.body!));
  }
}
