import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { OfferCatalogComponent } from './offer-catalog/offer-catalog.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { offerRoutingModule } from './offer-routing.module';

@NgModule({
  declarations: [CreateComponent, OfferCatalogComponent, OfferDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    offerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class OfferModule {}
