import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { OfferCatalogComponent } from './offer-catalog/offer-catalog.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { offerRoutingModule } from './offer-routing.module';

@NgModule({
  declarations: [CreateComponent, OfferCatalogComponent, OfferDetailsComponent],
  imports: [
    CommonModule,
    offerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class OfferModule {}
