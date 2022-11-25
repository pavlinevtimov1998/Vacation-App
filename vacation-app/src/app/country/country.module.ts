import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CountryRoutingModule } from './country-routing.module';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';
import { CountryOffersComponent } from './country-offers/country-offers.component';

@NgModule({
  declarations: [CountriesCatalogComponent, CountryOffersComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CountryModule {}
