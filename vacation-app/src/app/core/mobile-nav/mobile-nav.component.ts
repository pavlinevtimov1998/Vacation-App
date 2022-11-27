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
  @Input() currentUser$!: Observable<IAccount>;
  @Input() isLogged$!: Observable<boolean>;

  subscription!: Subscription;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  logoutHandler() {
    this.subscription = this.authService.logout$();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
