import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { OfferCatalogComponent } from './offer-catalog/offer-catalog.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { offerRoutingModule } from './offer-routing.module';
import { OfferReviewsComponent } from './offer-details/offer-reviews/offer-reviews.component';
import { ReviewComponent } from './offer-details/review/review.component';
import { BookingComponent } from './booking/booking.component';
import { MoreOffersComponent } from './offer-details/more-offers/more-offers.component';
import { BookingFormComponent } from './booking/booking-form/booking-form.component';

@NgModule({
  declarations: [
    CreateComponent,
    OfferCatalogComponent,
    OfferDetailsComponent,
    OfferReviewsComponent,
    ReviewComponent,
    BookingComponent,
    MoreOffersComponent,
    BookingFormComponent,
  ],
  imports: [
    CommonModule,
    offerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class OfferModule {}
