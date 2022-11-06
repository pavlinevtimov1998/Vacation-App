import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchComponent } from './search/search.component';
import { PopularDestinationsComponent } from './popular-destinations/popular-destinations.component';
import { PopularCountriesComponent } from './popular-countries/popular-countries.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CarouselComponent,
    SearchComponent,
    PopularDestinationsComponent,
    PopularCountriesComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    HeaderComponent,
    CarouselComponent,
    PopularDestinationsComponent,
    PopularCountriesComponent,
  ],
})
export class CoreModule {}
