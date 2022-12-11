import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BenefitsComponent } from './benefits/benefits.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CountryItemComponent } from './country-item/country-item.component';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { OfferImagesCarouselComponent } from './offer-images-carousel/offer-images-carousel.component';
import { PasswordsValidatorDirective } from './directives/passwords-validator.directive';
import { PaginationHelperPipe } from './pagination/pagination-pipe/pagination-helper.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerComponent } from './spinner/spinner.component';
import { SubstringPipe } from './substring.pipe';
import { AsyncValidatorDirective } from './directives/async-validator.directive';

@NgModule({
  declarations: [
    SpinnerComponent,
    BenefitsComponent,
    ClickOutsideDirective,
    CountryItemComponent,
    OfferItemComponent,
    OfferImagesCarouselComponent,
    PasswordsValidatorDirective,
    PaginationHelperPipe,
    PaginationComponent,
    SubstringPipe,
    AsyncValidatorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SpinnerComponent,
    BenefitsComponent,
    ClickOutsideDirective,
    CountryItemComponent,
    OfferItemComponent,
    OfferImagesCarouselComponent,
    PasswordsValidatorDirective,
    PaginationHelperPipe,
    PaginationComponent,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SubstringPipe,
    AsyncValidatorDirective,
  ],
})
export class SharedModule {}
