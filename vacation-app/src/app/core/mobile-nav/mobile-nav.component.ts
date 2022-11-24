import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, mergeMap, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth.service';
import { AgencyService } from 'src/app/agency/agency.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css'],
})
export class MobileNavComponent implements OnInit, OnDestroy {
  isLogged$ = this.authService.islogged$;
  currentUser$ = this.authService.currentUser$;

  subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private agencyService: AgencyService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logoutHandler() {
    this.subscription = this.authService.currentUser$
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
          this.authService.handleLogout();
          this.router.navigate(['/']);
        },
        error: (err) => {
          debugger;
          console.log(err);
          this.router.navigate(['/']);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
