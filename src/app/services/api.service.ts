import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponsePut } from '../interfaces/api-response-put';
import { GeneralMood } from '../interfaces/general-mood';
import { UserSuggestions } from '../user-suggestions';
import { FiltersService } from '../filters/filters.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private _http: HttpClient,
    private filtersService: FiltersService
  ) {}

  userExists(email: string): Observable<any> {
    return this._http.post(`${environment.apiBaseUrl}/userExists`, {
      email: email,
      id_token: localStorage.getItem('id_token')
    });
  }

  sendMood(
    selectedMood: string,
    message: string,
    isAnonymous: boolean
  ): Observable<ApiResponsePut> {
    return this._http.post<ApiResponsePut>(`${environment.apiBaseUrl}/mood`, {
      selectedMood: selectedMood,
      message: message,
      anonymous: isAnonymous,
      id_token: localStorage.getItem('id_token')
    });
  }

  getMoods(from = 0, to = 0, users = []): Observable<GeneralMood[]> {
    let params = new HttpParams()
      .set('from', from.toString())
      .append('to', to.toString());

    users.forEach((user, index) => {
      params = params.append('user' + index, user.email);
    });

    return this._http.get<GeneralMood[]>(`${environment.apiBaseUrl}/mood`, {
      params
    });
  }

  getLastMood(): Observable<any> {
    const headers = new HttpHeaders({
      idtoken: localStorage.getItem('id_token')
    });
    return this._http.get(`${environment.apiBaseUrl}/moods/last`, { headers });
  }

  getHrMoods(limit: string, from = '0', to = '0', users = []): Observable<any> {
    const headers = new HttpHeaders({
      idtoken: localStorage.getItem('id_token')
    });
    let params = new HttpParams()
      .set('limit', limit)
      .append('from', from)
      .append('to', to);

    users.forEach((user, index) => {
      params = params.append('user' + index, user.email);
    });

    return this._http.get(`${environment.apiBaseUrl}/hr/moods`, {
      headers,
      params
    });
  }

  getSuggestions(
    limit: string,
    from = Date.now().toString(),
    users = []
  ): Observable<any> {
    const headers = new HttpHeaders({
      idtoken: localStorage.getItem('id_token')
    });
    let params = new HttpParams().set('limit', limit).append('from', from);

    users.forEach((user, index) => {
      params = params.append('user' + index, user.email);
    });

    return this._http.get(`${environment.apiBaseUrl}/suggestions`, {
      headers,
      params
    });
  }

  getSuggestionsFromUser(
    limit: string,
    from = Date.now().toString(),
    email: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      idtoken: localStorage.getItem('id_token')
    });
    const params = new HttpParams()
      .set('limit', limit)
      .append('from', from)
      .append('user', email);
    return this._http.get(`${environment.apiBaseUrl}/suggestions/user`, {
      headers,
      params
    });
  }

  getSuggestion(token: string): Observable<any> {
    return this._http.get(`${environment.apiBaseUrl}/suggestions/${token}`);
  }

  sendSuggestions(message, anonymous) {
    return this._http.post(`${environment.apiBaseUrl}/suggestions`, {
      message,
      anonymous,
      id_token: localStorage.getItem('id_token')
    });
  }

  sendModifiedSuggestion(suggestion): Observable<any> {
    return this._http.put(`${environment.apiBaseUrl}/suggestions`, {
      suggestion
    });
  }

  sendKudos(
    to: string,
    message: string,
    anonymous: boolean
  ): Observable<ApiResponsePut> {
    return this._http.post<ApiResponsePut>(`${environment.apiBaseUrl}/kudos`, {
      to: to,
      message: message,
      anonymous: anonymous,
      id_token: localStorage.getItem('id_token')
    });
  }

  getUsers(filter: string): Observable<UserSuggestions[]> {
    const params = new HttpParams().set('filter', filter);
    return this._http.get<UserSuggestions[]>(
      `${environment.apiBaseUrl}/users`,
      {
        params: params
      }
    );
  }

  getKudos(
    limit: string,
    from = Date.now().toString(),
    users = []
  ): Observable<any> {
    let params = new HttpParams().set('limit', limit).append('from', from);

    users.forEach((user, index) => {
      params = params.append('user' + index, user.email);
    });

    return this._http.get(`${environment.apiBaseUrl}/kudos`, {
      params: params
    });
  }

  getNotifications(): Observable<any> {
    const headers = new HttpHeaders({
      idtoken: localStorage.getItem('id_token')
    });

    return this._http.get(`${environment.apiBaseUrl}/kudos/notifications`, {
      headers
    });
  }
  removeNotification(selectedNotification: number) {
    const headers = new HttpHeaders({
      idtoken: localStorage.getItem('id_token')
    });
    return this._http.delete(
      `${environment.apiBaseUrl}/kudos/${selectedNotification}`,
      { headers }
    );
  }
}
