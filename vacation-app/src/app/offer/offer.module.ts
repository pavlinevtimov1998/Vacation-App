import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '../shared/shared.module';
import { OfferCatalogComponent } from './offer-catalog/offer-catalog.component';
import { offerRoutingModule } from './offer-routing.module';
import { BookingFormComponent } from './booking/booking-form/booking-form.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [OfferCatalogComponent, BookingComponent, BookingFormComponent],
  imports: [
    CommonModule,
    offerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
})
export class OfferModule {}
