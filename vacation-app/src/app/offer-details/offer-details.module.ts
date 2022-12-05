import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BookingBtnComponent } from './booking-btn/booking-btn.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { EditDeleteBtnsComponent } from './edit-delete-btns/edit-delete-btns.component';
import { MoreOffersComponent } from './more-offers/more-offers.component';
import { OfferReviewsComponent } from './offer-reviews/offer-reviews.component';
import { UserActionBtnsComponent } from './user-action-btns/user-action-btns.component';
import { SharedModule } from '../shared/shared.module';
import { detailsRoutingModule } from './details-routing.module';
import { ReviewComponent } from './user-action-btns/review/review.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OfferDetailsComponent,
    BookingBtnComponent,
    EditDeleteBtnsComponent,
    MoreOffersComponent,
    OfferReviewsComponent,
    UserActionBtnsComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    detailsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class OfferDetailsModule {}
