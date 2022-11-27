import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/loading.service';
import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-countries-catalog',
  templateUrl: './countries-catalog.component.html',
  styleUrls: ['./countries-catalog.component.css'],
})
export class CountriesCatalogComponent implements OnInit, OnDestroy {
  countries!: ICountry[];

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  subscription$!: Subscription;

  constructor(
    private countryService: CountryService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.countryService.getAllCountries$().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
