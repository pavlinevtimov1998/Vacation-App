import { RouterModule, Routes } from '@angular/router';

import { UserAuthGuard } from '../auth/guards/user-auth.guard';
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
    canActivate: [UserAuthGuard],
  },
];

export const offerRoutingModule = RouterModule.forChild(routes);
