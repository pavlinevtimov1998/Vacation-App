import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAccount } from './shared/interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  guest!: IAccount;

  private _currentUser = new BehaviorSubject(this.guest);

  currentUser$ = this._currentUser.asObservable();
  islogged$ = this._currentUser.pipe(map((user) => !!user));

  constructor(private httpClient: HttpClient) {}

  handleLogin(account: IAccount) {
    if (account?.agencyName) {
      account.isAgency = true;
    } else if (account?.username) {
      account.isAgency = false;
    }

    this._currentUser.next(account);
  }

  handleLogout() {
    this._currentUser.next(this.guest);
  }

  userRegister$(body: {
    username: string;
    password: string;
    rePassword: string;
  }): Observable<IAccount> {
    return this.httpClient.post<IAccount>(
      environment.api + '/auth/user/register',
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
      environment.api + '/auth/user/login',
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
  }): Observable<IAccount> {
    return this.httpClient.post<IAccount>(
      environment.api + '/auth/agency/register',
      body,
      {
        withCredentials: true,
      }
    );
  }

  agencyLogin$(body: {
    email: string;
    password: string;
  }): Observable<IAccount> {
    return this.httpClient.post<IAccount>(
      environment.api + '/auth/agency/login',
      body,
      {
        withCredentials: true,
      }
    );
  }

  logout$(): Observable<{ message: string }> {
    return this.httpClient.get<{ message: string }>(
      environment.api + 'auth/logout',
      { withCredentials: true }
    );
  }

  appInitializer() {
    this.httpClient
      .get<IAccount>(environment.api + '/auth/profile', {
        withCredentials: true,
      })
      .subscribe({
        next: (account: IAccount) => {
          this.handleLogin(account);
        },
        error: (err) => {
          console.error(err);
          return EMPTY;
        },
      });
  }
}
