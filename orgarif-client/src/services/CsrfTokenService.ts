import { Errors } from '../errors';
import { getCookie } from '../utils';

const cookieName = 'XSRF-TOKEN';

export class CsrfTokenService {
  public header = 'X-XSRF-TOKEN';
  public inputName = '_csrf';
  public token!: string;

  constructor() {
    this.refreshToken()
  }

  public refreshToken() {
    const token = getCookie(cookieName);
    if (!token) {
      throw Errors._166ac42d();
    }
    this.token = token;
  }
}
