import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';
import { MaterialModule } from '../material/material.module';
import { featureRoutingModule } from './app-feature-routing.module';
import { TopAgenciesComponent } from './top-agencies/top-agencies.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OfferCatalogComponent } from './offer-catalog/offer-catalog.component';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';

@NgModule({
  declarations: [
    CountriesCatalogComponent,
    TopAgenciesComponent,
    CreateComponent,
    OfferCatalogComponent,
    OfferItemComponent,
    OfferDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    featureRoutingModule,
    ReactiveFormsModule,
  ],
})
export class FeatureModule {}
