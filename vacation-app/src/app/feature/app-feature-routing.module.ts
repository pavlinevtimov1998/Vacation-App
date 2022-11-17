import { RouterModule, Routes } from '@angular/router';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';
import { CreateComponent } from './create/create.component';
import { OfferCatalogComponent } from './offer-catalog/offer-catalog.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { TopAgenciesComponent } from './top-agencies/top-agencies.component';

const routes: Routes = [
  {
    path: 'countries',
    component: CountriesCatalogComponent,
  },
  {
    path: 'top-agencies',
    component: TopAgenciesComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'catalog',
    component: OfferCatalogComponent,
  },
  {
    path: ':offerId',
    component: OfferDetailsComponent,
  },
];

export const featureRoutingModule = RouterModule.forChild(routes);
