import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, mergeMap, Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth.service';
import { AgencyService } from 'src/app/agency/agency.service';
import { UserService } from 'src/app/user/user.service';
import { IAccount } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css'],
})
export class MobileNavComponent implements OnInit, OnDestroy {
  @Input() currentUser$!: Observable<IAccount | undefined>;
  @Input() isLogged$!: Observable<boolean>;

  isLoggedOut = false;

  subscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

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
