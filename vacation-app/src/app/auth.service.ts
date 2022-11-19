import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAccount } from './shared/interfaces/account.interface';
import { IOffer } from './shared/interfaces/offer.interface';

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

  getProfileData$(id: string): Observable<IAccount> {
    return this.httpClient.get<IAccount>(environment.api + '/profile/' + id, {
      withCredentials: true,
    });
  }

  appInitializer() {
    this.httpClient
      .get<IAccount>(environment.api + '/profile', {
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
