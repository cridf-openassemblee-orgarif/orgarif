import { Errors } from '../errors';

export class CsrfTokenService {
  public header = 'X-XSRF-TOKEN';
  public inputName = '_csrf';
  private _token?: string;

  get token() {
    if (!this._token) {
      this._token = csrfToken;
      if (!this._token) {
        throw Errors._166ac42d();
      }
    }
    return this._token;
  }

  updateToken = (headers: Headers) => {
    const token = headers.get(this.header);
    if (!token) {
      throw Errors._79ced190();
    }
    this._token = token;
  };
}
