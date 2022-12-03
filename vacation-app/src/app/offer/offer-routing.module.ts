import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/guards/auth.guard';
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
    canActivate: [AuthGuard],
  },
  {
    path: ':offerId',
    component: OfferDetailsComponent,
  },
];

export const offerRoutingModule = RouterModule.forChild(routes);
