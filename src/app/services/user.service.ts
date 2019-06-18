import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: any;

  constructor(private _http: HttpClient) {
    this.users = {
      anonymous: {
        name: 'anonymous',
        lastName: '',
        email: '',
        picture: 'assets/images/anonymous.svg'
      },
      hr: {
        name: 'HR',
        lastName: '',
        email: '',
        picture: 'assets/images/awesome.svg'
      }
    };
  }

  getUser(email: string): Observable<User> {
    if (this.users[email]) {
      return of(this.users[email]);
    } else {
      return this._http.get(`${environment.apiBaseUrl}/user/${email}`).pipe(
        tap((res: any) => {
          const data = res.data.Item;
          this.users[email] = data
            ? data
            : {
                name: email,
                lastName: '',
                email: '',
                picture: 'assets/images/anonymous.svg'
              };
        }),
        map(res => this.users[email])
      );
    }
  }
}
