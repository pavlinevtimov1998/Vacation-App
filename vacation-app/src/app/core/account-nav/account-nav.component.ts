import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, mergeMap, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { AgencyService } from 'src/app/auth/agency.service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.css'],
})
export class AccountNavComponent implements OnInit, OnDestroy {
  currentUser$ = this.authService.currentUser$;
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
    this.subscription = this.authService.currentUser$
      .pipe(
        mergeMap((account) => {
          if (account?.isAgency) {
            return this.agencyService.logout$();
          } else if (!account?.isAgency) {
            return this.UserService.logout$();
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe({
        next: (response) => {
          this.authService.handleLogout();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/']);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
