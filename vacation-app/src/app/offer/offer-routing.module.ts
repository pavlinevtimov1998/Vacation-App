import { RouterModule, Routes } from '@angular/router';
import { AgencyAuthGuard } from '../auth/guards/agency-auth.guard';

import { UserAuthGuard } from '../auth/guards/user-auth.guard';
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
    canActivate: [AgencyAuthGuard],
  },
  {
    path: 'book/:offerId',
    component: BookingComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: ':offerId',
    component: OfferDetailsComponent,
  },
];

export const offerRoutingModule = RouterModule.forChild(routes);
