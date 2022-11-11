import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchComponent } from './search/search.component';
import { PopularDestinationsComponent } from './popular-destinations/popular-destinations.component';
import { PopularCountriesComponent } from './popular-countries/popular-countries.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { AccountNavComponent } from './account-nav/account-nav.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    CarouselComponent,
    SearchComponent,
    PopularDestinationsComponent,
    PopularCountriesComponent,
    FooterComponent,
    WelcomePageComponent,
    MobileNavComponent,
    AccountNavComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
