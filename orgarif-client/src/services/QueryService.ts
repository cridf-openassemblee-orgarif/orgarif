import { appContext } from '../ApplicationContext';
import {
  IsLoginAlreadyTakenQuery,
  IsLoginAlreadyTakenQueryResponse
} from '../domain/queries';

export class QueryService {
  public isLoginAlreadyTakenQuery = (
    query: IsLoginAlreadyTakenQuery
  ): Promise<IsLoginAlreadyTakenQueryResponse> =>
    this.query('IsLoginAlreadyTakenQuery', query);

  private query = <R>(queryName: string, query?: object): Promise<R> =>
    appContext
      .httpService()
      .get('/query', {
        ...query,
        objectType: queryName
      })
      .then(r => r.body);
}
