import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  isLoading = true;

  subscription$!: Subscription;

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.subscription$ = this.countryService.getAllCountries$().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(['/']);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
