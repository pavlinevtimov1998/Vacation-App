import { RouterModule, Routes } from '@angular/router';

import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';
import { CountryOffersComponent } from './country-offers/country-offers.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CountriesCatalogComponent,
  },
  {
    path: ':countryId',
    component: CountryOffersComponent,
  },
];

export const CountryRoutingModule = RouterModule.forChild(routes);
