import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, mergeMap, Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth.service';
import { AgencyService } from 'src/app/agency/agency.service';
import { UserService } from 'src/app/user/user.service';
import { IAccount } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.css'],
})
export class AccountNavComponent implements OnInit, OnDestroy {
  @Input() currentUser$!: Observable<IAccount>;

  subscription!: Subscription;

  isMenuOpened: boolean = false;

  constructor(
    private authService: AuthService,
    private agencyService: AgencyService,
    private UserService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleDropDownMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside() {
    this.isMenuOpened = false;
  }

  logoutHandler() {
    this.subscription = this.authService.logout$();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
