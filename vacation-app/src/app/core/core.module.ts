import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './home/carousel/carousel.component';
import { SearchComponent } from './home/search/search.component';
import { PopularCountriesComponent } from './home/popular-countries/popular-countries.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomePageComponent } from './home/welcome-page/welcome-page.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { AccountNavComponent } from './account-nav/account-nav.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    CarouselComponent,
    SearchComponent,
    PopularCountriesComponent,
    FooterComponent,
    WelcomePageComponent,
    MobileNavComponent,
    AccountNavComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
