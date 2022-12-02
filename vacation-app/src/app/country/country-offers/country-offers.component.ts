import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/loading.service';

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
  offersCount!: number;
  countryId!: string;

  pages = 1;
  currentPage = 1;
  limit = 3;

  canClick = true;
  paginationLoading = false;

  get skip() {
    return (this.currentPage - 1) * this.limit;
  }

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getCountry();
  }

  setCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
    this.getCountryOffers();
  }

  getCountryOffers(): void {
    this.paginationLoading = true;
    this.canClick = false;

    this.subscription.add(
      this.countryService
        .getCountryOffers$(this.countryId, this.skip, this.limit)
        .subscribe({
          next: (offers) => {
            this.offers = offers;
            this.paginationLoading = false;
            this.canClick = true;
          },
          error: (err) => {
            console.log(err);
          },
        })
    );
  }

  private getCountry(): void {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          mergeMap((params) => {
            this.countryId = params['countryId'];

            return this.countryService.getCountry$(this.countryId);
          })
        )
        .subscribe({
          next: ({ country, offersCount }) => {
            this.pages = Math.ceil(offersCount / this.limit);
            this.country = country;
            this.getCountryOffers();
          },
          error: (err) => {
            console.log(err);
            this.router.navigate(['/']);
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
