import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IUser } from './core/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  userRegister$(body: {
    username: string;
    password: string;
    rePassword: string;
  }): Observable<IUser> {
    return this.httpClient.post<IUser>(environment.api + 'user/register', body, {
      withCredentials: true,
    });
  }

  userLogin$(body: { username: string; password: string }): Observable<IUser> {
    return this.httpClient.post<IUser>(environment.api + 'user/login', body, {
      withCredentials: true,
    });
  }
}
