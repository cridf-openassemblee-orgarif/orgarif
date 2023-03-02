<<<<<<< HEAD
import { appContext } from '../ApplicationContext';
import {
  GetOrganismeQuery,
  GetOrganismeQueryResponse,
  IsMailAlreadyTakenQuery,
  IsMailAlreadyTakenQueryResponse,
  ListOrganismesQuery,
  ListOrganismesQueryResponse,
  SearchDeliberationQuery,
  SearchDeliberationQueryResponse,
  SearchRepresentantsQuery,
  SearchRepresentantsQueryResponse
} from '../domain/queries';

export class QueryService {
  public getOrganismeQuery = (
    query: GetOrganismeQuery
  ): Promise<GetOrganismeQueryResponse> =>
    this.query('GetOrganismeQuery', query);

  public isMailAlreadyTakenQuery = (
    query: IsMailAlreadyTakenQuery
  ): Promise<IsMailAlreadyTakenQueryResponse> =>
    this.query('IsMailAlreadyTakenQuery', query);

  public listOrganismesQuery = (
    query: ListOrganismesQuery
  ): Promise<ListOrganismesQueryResponse> =>
    this.query('ListOrganismesQuery', query);

  public searchDeliberationQuery = (
    query: SearchDeliberationQuery
  ): Promise<SearchDeliberationQueryResponse> =>
    this.query('SearchDeliberationQuery', query);

  public searchRepresentantsQuery = (
    query: SearchRepresentantsQuery
  ): Promise<SearchRepresentantsQueryResponse> =>
    this.query('SearchRepresentantsQuery', query);

  private query = <R>(queryName: string, query?: object): Promise<R> =>
=======
import { Query, QueryResponse } from '../generated/query/queries';
import { appContext } from './ApplicationContext';

export class QueryService {
  public send = <R extends QueryResponse>(query: Query): Promise<R> =>
>>>>>>> template
    appContext
      .httpService()
      .get('/query', query)
      .then(r => r.body);
}
