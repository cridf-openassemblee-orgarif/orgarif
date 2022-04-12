import { appContext } from '../ApplicationContext';
import {
  IsMailAlreadyTakenQuery,
  IsMailAlreadyTakenQueryResponse
} from '../domain/queries';

export class QueryService {
  public isMailAlreadyTakenQuery = (
    query: IsMailAlreadyTakenQuery
  ): Promise<IsMailAlreadyTakenQueryResponse> =>
    this.query('IsMailAlreadyTakenQuery', query);

  private query = <R>(queryName: string, query?: object): Promise<R> =>
    appContext
      .httpService()
      .get('/query', {
        ...query,
        objectType: queryName
      })
      .then(r => r.body);
}
