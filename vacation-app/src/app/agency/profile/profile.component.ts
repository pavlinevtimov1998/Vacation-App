import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, mergeMap, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/app/loading.service';
import { IAccount, IAgency } from 'src/app/shared/interfaces';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class AgencyProfileComponent implements OnInit, OnDestroy {
  currentUser!: IAccount | undefined;
  agencyData!: IAgency;

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  subscription!: Subscription;

  constructor(
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.activatedRoute.params,
      this.authService.currentUser$,
    ])
      .pipe(
        mergeMap(([params, account]) => {
          const agencyId = params['agencyId'];
          this.currentUser = account;

          return this.agencyService.getAgencyProfileData$(agencyId);
        })
      )
      .subscribe({
        next: (agencyData) => {
          this.agencyData = agencyData;
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
