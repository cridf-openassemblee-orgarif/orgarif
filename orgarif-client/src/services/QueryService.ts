import { QueryResult, useQuery } from 'react-query';
import { appContext } from '../ApplicationContext';
import {
  IsLoginAlreadyTakenQuery,
  IsLoginAlreadyTakenQueryResponse,
  ListOrganismesQueryResponse,
} from '../domain/query';

export class QueryService {
  public isLoginAlreadyTakenQuery = (
    query: IsLoginAlreadyTakenQuery
  ): QueryResult<IsLoginAlreadyTakenQueryResponse> =>
    this.reactQuery('IsLoginAlreadyTakenQuery', query);

  public listOrganismesQuery = (): QueryResult<ListOrganismesQueryResponse> =>
    this.reactQuery('ListOrganismesQuery');

  private reactQuery = <R>(queryName: string, query?: object): QueryResult<R> =>
    useQuery(
      query ?? queryName,
      (queryName: string, query?: object): Promise<R> =>
        appContext
          .httpService()
          .get('/query', {
            ...query,
            objectType: '.' + queryName,
          })
          .then((r) => r.body)
    );
}
