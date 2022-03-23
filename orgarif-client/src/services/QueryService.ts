import { appContext } from '../ApplicationContext';
import {
  GetOrganismeQuery,
  GetOrganismeQueryResponse,
  IsLoginAlreadyTakenQuery,
  IsLoginAlreadyTakenQueryResponse,
  ListOrganismesByIdsQuery,
  ListOrganismesByIdsQueryResponse,
  ListOrganismesByLastModifiedQuery,
  ListOrganismesByLastModifiedQueryResponse,
  ListOrganismesBySecteurQuery,
  ListOrganismesBySecteurQueryResponse,
  ListOrganismesQueryResponse,
  SearchDeliberationQuery,
  SearchDeliberationQueryResponse,
  SearchOrganismesQuery,
  SearchOrganismesQueryResponse,
  SearchRepresentantsQuery,
  SearchRepresentantsQueryResponse
} from '../domain/queries';

export class QueryService {
  public getOrganismeQuery = (
    query: GetOrganismeQuery
  ): Promise<GetOrganismeQueryResponse> =>
    this.query('GetOrganismeQuery', query);

  public isLoginAlreadyTakenQuery = (
    query: IsLoginAlreadyTakenQuery
  ): Promise<IsLoginAlreadyTakenQueryResponse> =>
    this.query('IsLoginAlreadyTakenQuery', query);

  public listOrganismesByIdsQuery = (
    query: ListOrganismesByIdsQuery
  ): Promise<ListOrganismesByIdsQueryResponse> =>
    this.query('ListOrganismesByIdsQuery', query);

  public listOrganismesByLastModifiedQuery = (
    query: ListOrganismesByLastModifiedQuery
  ): Promise<ListOrganismesByLastModifiedQueryResponse> =>
    this.query('ListOrganismesByLastModifiedQuery', query);

  public listOrganismesBySecteurQuery = (
    query: ListOrganismesBySecteurQuery
  ): Promise<ListOrganismesBySecteurQueryResponse> =>
    this.query('ListOrganismesBySecteurQuery', query);

  public listOrganismesQuery = (): Promise<ListOrganismesQueryResponse> =>
    this.query('ListOrganismesQuery');

  public searchDeliberationQuery = (
    query: SearchDeliberationQuery
  ): Promise<SearchDeliberationQueryResponse> =>
    this.query('SearchDeliberationQuery', query);

  public searchOrganismesQuery = (
    query: SearchOrganismesQuery
  ): Promise<SearchOrganismesQueryResponse> =>
    this.query('SearchOrganismesQuery', query);

  public searchRepresentantsQuery = (
    query: SearchRepresentantsQuery
  ): Promise<SearchRepresentantsQueryResponse> =>
    this.query('SearchRepresentantsQuery', query);

  private query = <R>(queryName: string, query?: object): Promise<R> =>
    appContext
      .httpService()
      .get('/query', {
        ...query,
        objectType: queryName
      })
      .then(r => r.body);
}
