import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  EMPTY,
  map,
  mergeMap,
  Observable,
  Subscription,
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { AgencyService } from './agency/agency.service';
import { IAccount } from './shared/interfaces/account.interface';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  guest!: IAccount;

  private _currentUser = new BehaviorSubject(this.guest);

  get currentUser$() {
    return this._currentUser.asObservable();
  }

  get isLogged$() {
    return this._currentUser.pipe(map((user) => !!user));
  }

  constructor(
    private httpClient: HttpClient,
    private agencyService: AgencyService,
    private userService: UserService,
    private router: Router
  ) {}

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

  logout$(): Subscription {
    return this.currentUser$
      .pipe(
        mergeMap((account) => {
          if (account?.isAgency) {
            return this.agencyService.logout$();
          } else if (!account?.isAgency) {
            return this.userService.logout$();
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.handleLogout();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/']);
        },
      });
  }

  appInitializer() {
    this.httpClient
      .get<IAccount>(`${environment.api}/profile`, {
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
