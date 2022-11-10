import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAgency } from './core/interfaces/agency.interface';
import { IUser } from './core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  guest!: IUser | IAgency;

  private _currentUser = new BehaviorSubject(this.guest);

  currentUser$ = this._currentUser.asObservable();
  islogged$ = this._currentUser.pipe(map((user) => !user));

  constructor(private httpClient: HttpClient) {}

  handleLogin(user: IUser | IAgency) {
    console.log(user);

    this._currentUser.next(user);
  }

  userRegister$(body: {
    username: string;
    password: string;
    rePassword: string;
  }): Observable<IUser> {
    return this.httpClient.post<IUser>(
      environment.api + 'auth/user/register',
      body,
      {
        withCredentials: true,
      }
    );
  }

  userLogin$(body: { username: string; password: string }): Observable<IUser> {
    return this.httpClient.post<IUser>(
      environment.api + 'auth/user/login',
      body,
      {
        withCredentials: true,
      }
    );
  }

  agencyRegister$(body: {
    email: string;
    agencyName: string;
    password: string;
    rePassword: string;
  }): Observable<IAgency> {
    return this.httpClient.post<IAgency>(
      environment.api + 'auth/agency/register',
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
      environment.api + 'auth/agency/login',
      body,
      {
        withCredentials: true,
      }
    );
  }

  logout$(): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      environment.api + 'auth/logout',
      { withCredentials: true }
    );
  }
}
