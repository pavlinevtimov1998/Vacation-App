import { RouterModule, Routes } from '@angular/router';
import { AgencyAuthGuard } from '../auth/guards/agency-auth.guard';
import { AgencyOffersComponent } from './agency-offers/agency-offers.component';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AgencyProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'profile/:agencyId',
    component: AgencyProfileComponent,
  },
  {
    path: 'edit/profile/:agencyId',
    component: EditProfileComponent,
    canActivate: [AgencyAuthGuard],
  },
  {
    path: 'offers/:agencyId',
    component: AgencyOffersComponent,
  },
];

export const agencyRoutingModule = RouterModule.forChild(routes);
