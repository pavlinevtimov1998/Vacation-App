import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgencyService } from 'src/app/agency/agency.service';

import { AuthService } from 'src/app/auth/auth.service';
import { IAccount } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.css'],
})
export class AccountNavComponent implements OnInit, OnDestroy {
  get currentUser$() {
    return this.authService.currentUser$;
  }

  currentUser!: IAccount | undefined;

  subscription$!: Subscription;
  isLoggedOut = false;

  isMenuOpened: boolean = false;

  constructor(
    private authService: AuthService,
    private agencyService: AgencyService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.subscription$ = this.authService.currentUser$.subscribe((account) => {
      this.currentUser = account;
    });
  }

  toggleDropDownMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside() {
    this.isMenuOpened = false;
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
