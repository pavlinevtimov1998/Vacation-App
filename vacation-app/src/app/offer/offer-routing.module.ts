import { RouterModule, Routes } from '@angular/router';
import { BookGuard } from '../auth/guards/book.guard';

import { OfferCatalogComponent } from '../offer/offer-catalog/offer-catalog.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OfferCatalogComponent,
  },
  {
    path: 'book/:offerId',
    component: BookingComponent,
    canActivate: [BookGuard],
  },
];

export const offerRoutingModule = RouterModule.forChild(routes);
