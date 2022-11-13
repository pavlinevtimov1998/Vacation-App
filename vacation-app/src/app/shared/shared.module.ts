import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitsComponent } from './benefits/benefits.component';
import { MaterialModule } from '../material/material.module';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [BenefitsComponent, ClickOutsideDirective],
  imports: [CommonModule, MaterialModule],
  exports: [BenefitsComponent, ClickOutsideDirective],
})
export class SharedModule {}
