import { appContext } from '../ApplicationContext';
import {
  ExceptionQuery,
  IsLoginAlreadyTakenQuery,
  IsLoginAlreadyTakenQueryResponse,
} from '../domain/query';

export class QueryService {
  public isLoginAlreadyTakenQuery = (
    query: IsLoginAlreadyTakenQuery
  ): Promise<IsLoginAlreadyTakenQueryResponse> =>
    this.query('IsLoginAlreadyTakenQuery', query);

  public exceptionQuery = (query: ExceptionQuery): Promise<any> =>
    this.query('ExceptionQuery', query);

  public runtimeExceptionQuery = (): Promise<any> =>
    this.query('RuntimeExceptionQuery');

  private query = <R>(queryName: string, query?: object): Promise<R> =>
    appContext
      .httpService()
      .get('/query', {
        ...query,
        objectType: '.' + queryName,
      })
      .then((r) => r.body);
}
