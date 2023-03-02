import { appContext } from '../ApplicationContext';
import { Query, QueryResponse } from '../generated/query/queries';

export class QueryService {
  public send = <R extends QueryResponse>(query: Query): Promise<R> =>
    appContext
      .httpService()
      .get('/query', query)
      .then(r => r.body);
}
