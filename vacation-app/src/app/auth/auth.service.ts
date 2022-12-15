import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, take, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAccount } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser$$ = new BehaviorSubject<IAccount | null>(null);

  currentUser$ = this._currentUser$$.asObservable();
  isLogged$ = this._currentUser$$.pipe(map((user) => !!user));

  constructor(private httpClient: HttpClient) {}

  handleLogin(account: IAccount) {
    this._currentUser$$.next(account);
  }

  handleLogout() {
    this._currentUser$$.next(null);
  }

  appInitializer() {
    return this.httpClient
      .get<IAccount>(`${environment.api}/profile`, {
        withCredentials: true,
      })
      .pipe(
        take(1),
        tap((account) => {
          this.handleLogin(account);
        }),
        catchError((err) => EMPTY)
      );
  }
}
