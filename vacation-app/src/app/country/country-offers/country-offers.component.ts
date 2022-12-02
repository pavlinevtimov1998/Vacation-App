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

  get skip() {
    return (this.currentPage - 1) * this.limit;
  }

  subscription = new Subscription();

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  paginationLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getCountry();
  }

  previousPage() {
    if (this.currentPage > 1 && this.canClick) {
      this.currentPage--;
      this.getCountryOffers();
    }
  }

  nextPage() {
    if (this.currentPage < this.pages && this.canClick) {
      this.currentPage++;
      this.getCountryOffers();
    }
  }

  rowClickHandler(page: number) {
    if (this.canClick) {
      this.currentPage = page;
      this.getCountryOffers();
    }
  }

  private getCountryOffers(): void {
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

  private getCountry() {
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
