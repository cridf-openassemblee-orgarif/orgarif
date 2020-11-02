import { appContext } from '../ApplicationContext';
import {
  IsLoginAlreadyTakenQuery,
  IsLoginAlreadyTakenQueryResponse,
  ListOrganismesQueryResponse,
} from '../domain/query';

export class QueryService {
  public isLoginAlreadyTakenQuery = (
    query: IsLoginAlreadyTakenQuery
  ): Promise<IsLoginAlreadyTakenQueryResponse> =>
    this.query('IsLoginAlreadyTakenQuery', query);

  public listOrganismesQuery = (): Promise<ListOrganismesQueryResponse> =>
    this.query('ListOrganismesQuery');

  private query = <R>(queryName: string, query?: object): Promise<R> =>
    appContext
      .httpService()
      .get('/query', {
        ...query,
        objectType: '.' + queryName,
      })
      .then((r) => r.body);
}
