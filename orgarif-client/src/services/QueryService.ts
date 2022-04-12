import { appContext } from '../ApplicationContext';
import {
  GetOrganismeQuery,
  GetOrganismeQueryResponse,
  IsMailAlreadyTakenQuery,
  IsMailAlreadyTakenQueryResponse,
  ListOrganismesBySecteurQuery,
  ListOrganismesBySecteurQueryResponse,
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
