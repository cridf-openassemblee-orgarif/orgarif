import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PasswordResetFinishService {
  constructor(private http: HttpClient) {}

  save(key: string, newPassword: string): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/account/reset-password/finish', { key, newPassword });
  }
}
