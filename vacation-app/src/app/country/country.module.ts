import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { countryRoutingModule } from './country-routing.module';

@NgModule({
  declarations: [CountriesCatalogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    countryRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CountryModule {}
