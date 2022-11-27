import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth.service';
import { IAccount } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.css'],
})
export class AccountNavComponent implements OnDestroy {
  get currentUser$() {
    return this.authService.currentUser$;
  }

  subscription!: Subscription;
  isLoggedOut = false;

  isMenuOpened: boolean = false;

  constructor(private authService: AuthService) {}

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

    this.subscription = this.authService.logout$();
    this.isLoggedOut = true;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
