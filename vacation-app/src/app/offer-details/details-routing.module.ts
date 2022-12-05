import { RouterModule, Routes } from '@angular/router';

import { OfferDetailsComponent } from './offer-details/offer-details.component';

const routes: Routes = [{ path: ':offerId', component: OfferDetailsComponent }];

export const detailsRoutingModule = RouterModule.forChild(routes);
