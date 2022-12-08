import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription, switchMap } from 'rxjs';

import { ICountry, IOffer } from 'src/app/shared/interfaces';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-offers',
  templateUrl: './country-offers.component.html',
  styleUrls: ['./country-offers.component.css'],
})
export class CountryOffersComponent implements OnInit, OnDestroy {
  country!: ICountry;
  offers!: IOffer[];
  countryId!: string;

  pages = 1;
  currentPage = 1;
  limit = 3;

  paginationLoading = false;

  get skip() {
    return (this.currentPage - 1) * this.limit;
  }

  isLoading = true;

  subscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initialLoad();
  }

  setCurrentPage(currentPage: number) {
    if (this.currentPage !== currentPage) {
      this.currentPage = currentPage;
    }
    this.subscription?.unsubscribe();
    this.getCountryOffers();
  }

  private getCountryOffers(): void {
    this.paginationLoading = true;

    this.subscription = this.countryService
      .getCountryOffers$(this.countryId, this.skip, this.limit)
      .subscribe({
        next: (offers) => {
          this.offers = offers;
          this.paginationLoading = false;
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }

  private initialLoad(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.countryId = params['countryId'];

          return this.countryService.getCountry$(this.countryId);
        }),
        mergeMap(({ country, offersCount }) => {
          this.pages = Math.ceil(offersCount / this.limit);
          this.country = country;

          return this.countryService.getCountryOffers$(
            this.countryId,
            this.skip,
            this.limit
          );
        })
      )
      .subscribe({
        next: (offers) => {
          this.offers = offers;
          this.isLoading = false;
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
