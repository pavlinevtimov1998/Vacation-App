import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { MaterialModule } from '../material/material.module';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [BannerComponent, ClickOutsideDirective],
  imports: [CommonModule, MaterialModule],
  exports: [BannerComponent, ClickOutsideDirective],
})
export class SharedModule {}
