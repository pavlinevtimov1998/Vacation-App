import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BenefitsComponent } from './benefits/benefits.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CountryItemComponent } from './country-item/country-item.component';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { OfferImagesCarouselComponent } from './offer-images-carousel/offer-images-carousel.component';
import { PasswordsValidatorDirective } from './directives/passwords-validator.directive';

@NgModule({
  declarations: [
    BenefitsComponent,
    ClickOutsideDirective,
    CountryItemComponent,
    OfferItemComponent,
    OfferImagesCarouselComponent,
    PasswordsValidatorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
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
    MatDatepickerModule,
    OfferImagesCarouselComponent,
    PasswordsValidatorDirective,
    MatProgressSpinnerModule
  ],
})
export class SharedModule {}
