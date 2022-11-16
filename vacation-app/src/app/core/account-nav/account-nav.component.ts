import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, mergeMap, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.css'],
})
export class AccountNavComponent implements OnInit, OnDestroy {
  currentUser$ = this.authService.currentUser$;
  subscription!: Subscription;

  isMenuOpened: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleDropDownMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside() {
    this.isMenuOpened = false;
  }

  logoutHandler() {
    this.subscription = this.currentUser$
      .pipe(
        mergeMap((account) => {
          const url = account?.isAgency ? '/agency' : '/user';

          return this.authService.logout$(url);
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
