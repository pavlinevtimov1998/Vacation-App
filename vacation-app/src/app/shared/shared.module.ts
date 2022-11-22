import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { BenefitsComponent } from './benefits/benefits.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { AuthDialogComponent } from './dialog/auth-dialog.component';
import { CountryItemComponent } from './country-item/country-item.component';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { OfferImagesCarouselComponent } from './offer-images-carousel/offer-images-carousel.component';

@NgModule({
  declarations: [
    BenefitsComponent,
    ClickOutsideDirective,
    AuthDialogComponent,
    CountryItemComponent,
    OfferItemComponent,
    SpinnerComponent,
    OfferImagesCarouselComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    BenefitsComponent,
    ClickOutsideDirective,
    CountryItemComponent,
    OfferItemComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    SpinnerComponent,
    MatDatepickerModule,
    OfferImagesCarouselComponent,
  ],
})
export class SharedModule {}
