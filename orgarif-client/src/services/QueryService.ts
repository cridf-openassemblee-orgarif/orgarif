import { appContext } from '../ApplicationContext';
import {
  GetOrganismeQuery,
  GetOrganismeQueryResponse,
  IsLoginAlreadyTakenQuery,
  IsLoginAlreadyTakenQueryResponse,
  ListOrganismesQueryResponse,
  SearchDeliberationQuery,
  SearchDeliberationQueryResponse
} from '../domain/query';

export class QueryService {
  public getOrganismeQuery = (
    query: GetOrganismeQuery
  ): Promise<GetOrganismeQueryResponse> =>
    this.query('GetOrganismeQuery', query);

  public isLoginAlreadyTakenQuery = (
    query: IsLoginAlreadyTakenQuery
  ): Promise<IsLoginAlreadyTakenQueryResponse> =>
    this.query('IsLoginAlreadyTakenQuery', query);

  public listOrganismesQuery = (): Promise<ListOrganismesQueryResponse> =>
    this.query('ListOrganismesQuery');

  public searchDeliberationQuery = (
    query: SearchDeliberationQuery
  ): Promise<SearchDeliberationQueryResponse> =>
    this.query('SearchDeliberationQuery', query);

  private query = <R>(queryName: string, query?: object): Promise<R> =>
    appContext
      .httpService()
      .get('/query', {
        ...query,
        objectType: queryName
      })
      .then(r => r.body);
}
