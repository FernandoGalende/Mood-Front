import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { authConfig } from '../../environments/environment';
import { Auth0Token } from '../interfaces/auth0-token.ts';
import { IdToken } from '../interfaces/id-token';

const GRANT_TYPE = 'password';
const SCOPE = 'openid profile read:clients';

function expiresAt(auth0Ttl: number): string {
  return JSON.stringify(auth0Ttl * 1000 + new Date().getTime());
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(user: string, password: string): Observable<Auth0Token> {
    return this._http
      .post<Auth0Token>(`${authConfig.url}/oauth/token`, {
        grant_type: GRANT_TYPE,
        username: user,
        password: password,
        audience: authConfig.audience,
        scope: SCOPE,
        client_id: authConfig.clientID
      })
      .pipe(tap((value: Auth0Token) => this.setLocalStorage(value)));
  }

  setLocalStorage(token: Auth0Token): void {
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('id_token', token.id_token);
    localStorage.setItem('expires_at', expiresAt(token.expires_in));
  }

  getUserInfo(): IdToken {
    return jwtDecode(localStorage.getItem('id_token'));
  }

  isAuthenticated(): boolean {
    const expires = parseInt(localStorage.getItem('expires_at'), 10);
    return expires ? new Date().getTime() < expires : false;
  }
}
