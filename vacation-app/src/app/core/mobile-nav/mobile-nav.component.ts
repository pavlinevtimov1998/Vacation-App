import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css'],
})
export class MobileNavComponent implements OnDestroy {
  get currentUser$() {
    return this.authService.currentUser$;
  }

  get isLogged$() {
    return this.authService.isLogged$;
  }

  isLoggedOut = false;

  subscription!: Subscription;

  constructor(private authService: AuthService) {}

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
