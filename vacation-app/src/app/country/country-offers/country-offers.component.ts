import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';

import { ICountry, IOffer } from 'src/app/shared/interfaces';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-offers',
  templateUrl: './country-offers.component.html',
  styleUrls: ['./country-offers.component.css'],
})
export class CountryOffersComponent implements OnInit {
  country!: ICountry;
  offers!: IOffer[];

  subscription!: Subscription;

  isLoading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        mergeMap((params) => {
          const countryId = params['countryId'];

          return this.countryService.getCountryWithOffers$(countryId);
        })
      )
      .subscribe({
        next: (country) => {
          this.country = country;
          this.offers = country.offers as IOffer[];

          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/']);
        },
      });
  }
}
