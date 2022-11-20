import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferService } from 'src/app/offer/offer.service';
import { ICountry } from 'src/app/shared/interfaces/country.interface';

@Component({
  selector: 'app-countries-catalog',
  templateUrl: './countries-catalog.component.html',
  styleUrls: ['./countries-catalog.component.css'],
})
export class CountriesCatalogComponent implements OnInit {
  countries!: ICountry[];

  subscription$!: Subscription;

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.subscription$ = this.offerService.getAllCountries$().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (err) => {},
    });
  }
}
