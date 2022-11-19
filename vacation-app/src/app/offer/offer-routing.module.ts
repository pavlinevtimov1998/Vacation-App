import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../offer/create/create.component';
import { OfferCatalogComponent } from '../offer/offer-catalog/offer-catalog.component';
import { OfferDetailsComponent } from '../offer/offer-details/offer-details.component';

const routes: Routes = [
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

export const offerRoutingModule = RouterModule.forChild(routes);
