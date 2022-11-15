import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css'],
})
export class MobileNavComponent implements OnInit {
  isLogged$ = this.authService.islogged$;
  currentUser$ = this.authService.currentUser$;

  subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logoutHandler() {
    this.subscription = this.currentUser$
      .pipe(
        mergeMap((account) => {
          const url = account.isAgency ? '/agency/' : '/user/';

          return this.authService.logout$(url);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.authService.handleLogout();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/']);
        },
      });
  }
}
