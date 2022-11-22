import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../offer/create/create.component';
import { OfferCatalogComponent } from '../offer/offer-catalog/offer-catalog.component';
import { OfferDetailsComponent } from '../offer/offer-details/offer-details.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OfferCatalogComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'book/:offerId',
    component: BookingComponent,
  },
  {
    path: ':offerId',
    component: OfferDetailsComponent,
  },
];

export const offerRoutingModule = RouterModule.forChild(routes);
