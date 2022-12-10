import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgencyService } from 'src/app/agency/agency.service';

import { AuthService } from 'src/app/auth/auth.service';
import { IAccount } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css'],
})
export class MobileNavComponent implements OnInit, OnDestroy {
  get currentUser$() {
    return this.authService.currentUser$;
  }

  get isLogged$() {
    return this.authService.isLogged$;
  }

  currentUser!: IAccount | undefined;
  isLoggedOut = false;

  subscription$!: Subscription;

  constructor(
    private authService: AuthService,
    private agencyService: AgencyService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscription$ = this.authService.currentUser$.subscribe((account) => {
      this.currentUser = account;
    });
  }

  logoutHandler() {
    if (this.isLoggedOut) {
      return;
    }
    this.isLoggedOut = true;

    if (this.currentUser?.isAgency) {
      this.agencyService.logout$();
    } else {
      this.userService.logout$();
    }
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
