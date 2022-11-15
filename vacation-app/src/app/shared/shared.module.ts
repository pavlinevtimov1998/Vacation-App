import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitsComponent } from './benefits/benefits.component';
import { MaterialModule } from '../material/material.module';
import { ClickOutsideDirective } from './click-outside.directive';
import { AuthDialogComponent } from './dialog/auth-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BenefitsComponent, ClickOutsideDirective, AuthDialogComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [BenefitsComponent, ClickOutsideDirective],
})
export class SharedModule {}
