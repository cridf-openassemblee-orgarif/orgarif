import { Query, QueryResponse } from '../generated/query/Queries';
import { appContext } from './ApplicationContext';

export class QueryService {
  public send = <R extends QueryResponse>(query: Query): Promise<R> =>
    appContext.httpService.get('/query', query).then(r => r.body);
}
