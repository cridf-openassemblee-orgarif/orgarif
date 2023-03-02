import { Instant } from '../domain/datetime';
import { NominalString } from '../utils/nominal-class';
import { appContext } from './ApplicationContext';

type RequestType = 'Get' | 'Post';

export const displayErrorMessage = 'DisplayError';

export interface HttpResponse {
  status: number;
  body?: any;
}

type RequestErrorId = NominalString<'RequestErrorId'>;

export interface RequestError {
  id?: RequestErrorId;
  status: number;
  error: string;
  message: string;
  instant: Instant;
  stackTrace?: any;
}

export class HttpService {
  public credentials: RequestCredentials = 'same-origin';

  public get = (url: string, getParams?: any) =>
    this.fetchAndDeserialize('Get', url, getParams);

  public post = (url: string, bodyObject?: any) =>
    this.fetchAndDeserialize('Post', url, null, JSON.stringify(bodyObject));

  public fetch(
    requestType: RequestType,
    url: string,
    getParams?: any,
    bodyAsString?: string
  ): Promise<Response> {
    const params: RequestInit = {
      method: requestType,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        [appContext.csrfTokenService().header]:
          appContext.csrfTokenService().token
      },
      credentials: this.credentials
    };
    if (bodyAsString) {
      params.body = bodyAsString;
    }
    let finalUrl = url;
    if (getParams) {
      finalUrl += '?' + encodeURIComponent(JSON.stringify(getParams));
    }
    return fetch(finalUrl, params);
  }

  private fetchAndDeserialize(
    requestType: RequestType,
    url: string,
    getParams?: any,
    bodyAsString?: string
  ): Promise<HttpResponse> {
    return this.fetch(requestType, url, getParams, bodyAsString).then(
      (response: Response) => {
        if (response.ok) {
          return response.text().then(t => ({
            status: response.status,
            body: t !== '' ? JSON.parse(t) : undefined
          }));
        } else {
          return response.text().then(t => {
            const error: RequestError = JSON.parse(t);
            if (error.error === displayErrorMessage) {
              return Promise.reject(displayErrorMessage);
            }
            return Promise.reject(error);
          });
        }
      }
    );
  }
}
