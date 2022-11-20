import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-countries-catalog',
  templateUrl: './countries-catalog.component.html',
  styleUrls: ['./countries-catalog.component.css'],
})
export class CountriesCatalogComponent implements OnInit, OnDestroy {
  countries!: ICountry[];

  subscription$!: Subscription;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.subscription$ = this.countryService.getAllCountries$().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (err) => {},
    });
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
