import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAccount } from '../shared/interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  userRegister$(body: {
    username: string;
    password: string;
    rePassword: string;
  }): Observable<IAccount> {
    return this.httpClient.post<IAccount>(
      `${environment.api}/user/register`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  userLogin$(body: {
    username: string;
    password: string;
  }): Observable<IAccount> {
    return this.httpClient.post<IAccount>(
      `${environment.api}/user/login`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  logout$(): Observable<{ message: string }> {
    return this.httpClient.get<{ message: string }>(
      `${environment.api}/user/logout`,
      { withCredentials: true }
    );
  }
}
