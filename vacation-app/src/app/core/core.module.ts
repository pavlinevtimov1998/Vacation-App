import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [HeaderComponent, CarouselComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent, CarouselComponent],
})
export class CoreModule {}