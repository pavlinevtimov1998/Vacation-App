import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { IAgency, IOffer } from 'src/app/shared/interfaces';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-agency-offers',
  templateUrl: './agency-offers.component.html',
  styleUrls: ['./agency-offers.component.css'],
})
export class AgencyOffersComponent implements OnInit {
  offers!: IOffer[];
  agency!: IAgency;

  pages = 1;
  currentPage = 1;
  limit = 6;

  get skip() {
    return (this.currentPage - 1) * this.limit;
  }

  isLoading = true;
  paginationLoading = false;

  subscription!: Subscription;

  constructor(
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAgencyOffers();
  }

  setCurrentPage(currentPage: number): void {
    if (this.currentPage !== currentPage) {
      this.currentPage = currentPage;
      this.subscription?.unsubscribe();
      this.getAgencyOffers();
    }
  }

  getAgencyOffers(): void {
    this.paginationLoading = true;

    this.subscription = this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          const agencyId = params['agencyId'];

          return this.agencyService.getAgencyOffers$(
            agencyId,
            this.skip,
            this.limit
          );
        })
      )
      .subscribe({
        next: ({ offers, agency, offersCount }) => {
          this.pages = Math.ceil(offersCount / this.limit) || 1;

          this.agency = agency;
          this.offers = offers;

          this.isLoading = false;
          this.paginationLoading = false;
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }
}
