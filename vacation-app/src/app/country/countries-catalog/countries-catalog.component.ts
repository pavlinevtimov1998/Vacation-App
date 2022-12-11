import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-countries-catalog',
  templateUrl: './countries-catalog.component.html',
  styleUrls: ['./countries-catalog.component.css'],
})
export class CountriesCatalogComponent implements OnInit, OnDestroy {
  countries!: ICountry[];

  pages = 1;
  currentPage = 1;
  limit = 6;

  get skip() {
    return (this.currentPage - 1) * this.limit;
  }

  isLoading = true;
  paginationLoading = false;

  subscription$!: Subscription;

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.getCountries();
  }

  setCurrentPage(currentPage: number) {
    if (this.currentPage !== currentPage) {
      this.currentPage = currentPage;
      this.subscription$?.unsubscribe();
      this.getCountries();
    }
  }

  countryFormHandler(
    countryForm: NgForm,
    paginationComponent: PaginationComponent
  ): void {
    if (countryForm.invalid) {
      return;
    }

    const search = countryForm.controls['search'].value;

    this.currentPage = 1;
    paginationComponent.currentPage = 1;

    this.getCountries(search);
  }

  getCountries(search?: string): void {
    this.paginationLoading = true;

    this.subscription$ = this.countryService
      .getCountries$(this.skip, this.limit, search || '')
      .subscribe({
        next: ({ countries, countriesCount }) => {
          this.pages = Math.ceil(countriesCount / this.limit) || 1;

          this.countries = countries;

          this.isLoading = false;
          this.paginationLoading = false;
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
