import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AgencyService } from 'src/app/agency/agency.service';
import { LoadingService } from 'src/app/loading.service';
import { IAgency } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-top-agencies',
  templateUrl: './top-agencies.component.html',
  styleUrls: ['./top-agencies.component.css'],
})
export class TopAgenciesComponent implements OnInit, OnDestroy {
  agencies!: IAgency[];

  isLoading = true;

  subscription!: Subscription;

  constructor(
    private agencyService: AgencyService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscription = this.agencyService.getTopAgencies$().subscribe({
      next: (agencies) => {
        this.agencies = agencies;
        this.isLoading = false;
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
