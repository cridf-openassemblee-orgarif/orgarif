import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { Level, LoggersResponse } from './log.model';

@Injectable({ providedIn: 'root' })
export class LogsService {
  constructor(private http: HttpClient) {}

  changeLevel(name: string, configuredLevel: Level): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'management/loggers/' + name, { configuredLevel });
  }

  findAll(): Observable<LoggersResponse> {
    return this.http.get<LoggersResponse>(SERVER_API_URL + 'management/loggers');
  }
}
