import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  mergeMap,
  Subscription,
  tap,
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { AgencyService } from '../agency/agency.service';
import { MessageBusService } from '../message-bus.service';
import { IAccount } from '../shared/interfaces/account.interface';
import { MessageType } from '../shared/interfaces/message.interface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser = new BehaviorSubject<IAccount | undefined>(undefined);

  currentUser$ = this._currentUser.asObservable();
  isLogged$ = this._currentUser.pipe(map((user) => !!user));

  constructor(
    private httpClient: HttpClient,
    private agencyService: AgencyService,
    private userService: UserService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  handleLogin(account: IAccount) {
    this._currentUser.next(account);
  }

  handleLogout() {
    this._currentUser.next(undefined);
  }

  logout$(): Subscription {
    return this.currentUser$
      .pipe(
        mergeMap((account) => {
          if (!account) {
            return EMPTY;
          }
          if (account?.isAgency) {
            return this.agencyService.logout$();
          } else {
            return this.userService.logout$();
          }
        })
      )
      .subscribe({
        next: (response) => {
          this.messageBus.addMessage({
            message: 'Successful logout!',
            type: MessageType.Success,
          });

          this.router.navigate(['/']);
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }

  appInitializer() {
    return this.httpClient
      .get<IAccount>(`${environment.api}/profile`, {
        withCredentials: true,
      })
      .pipe(
        tap((account) => {
          if (account.agencyName) {
            account.isAgency = true;
          } else {
            account.isAgency = false;
          }

          this.handleLogin(account);
        }),
        catchError((err) => EMPTY)
      );
  }
}
