import { Errors } from '../errors';
import { getCookie } from '../utils';

const cookieName = 'XSRF-TOKEN';

export class CsrfTokenService {
  public header = 'X-XSRF-TOKEN';
  public inputName = '_csrf';
  public token: string;

  constructor() {
    const token = getCookie(cookieName);
    if (!token) {
      throw Errors._4b60ab70();
    }
    this.token = token;
  }

  public refreshToken() {
    const token = getCookie(cookieName);
    if (!token) {
      throw Errors._166ac42d();
    }
    this.token = token;
  }
}
