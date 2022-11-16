import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitsComponent } from './benefits/benefits.component';
import { MaterialModule } from '../material/material.module';
import { ClickOutsideDirective } from './click-outside.directive';
import { AuthDialogComponent } from './dialog/auth-dialog.component';
import { RouterModule } from '@angular/router';
import { CountryItemComponent } from './country-item/country-item.component';

@NgModule({
  declarations: [
    BenefitsComponent,
    ClickOutsideDirective,
    AuthDialogComponent,
    CountryItemComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [BenefitsComponent, ClickOutsideDirective, CountryItemComponent],
})
export class SharedModule {}
