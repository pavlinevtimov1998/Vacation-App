import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAgency } from './core/interfaces/agency.interface';

import { IUser } from './core/interfaces/user.interface';

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
    return this.httpClient.post<IUser>(
      environment.api + 'user/register',
      body,
      {
        withCredentials: true,
      }
    );
  }

  userLogin$(body: { username: string; password: string }): Observable<IUser> {
    return this.httpClient.post<IUser>(environment.api + 'user/login', body, {
      withCredentials: true,
    });
  }

  agencyRegister$(body: {
    email: string;
    agencyName: string;
    password: string;
    rePassword: string;
  }): Observable<IAgency> {
    return this.httpClient.post<IAgency>(
      environment.api + 'agency/register',
      body,
      {
        withCredentials: true,
      }
    );
  }

  loginRegister$(body: {
    email: string;
    password: string;
  }): Observable<IAgency> {
    return this.httpClient.post<IAgency>(
      environment.api + 'agency/login',
      body,
      {
        withCredentials: true,
      }
    );
  }
}
