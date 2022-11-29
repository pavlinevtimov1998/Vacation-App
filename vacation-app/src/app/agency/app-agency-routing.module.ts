import { RouterModule, Routes } from '@angular/router';

import { AgencyProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'profile/:agencyId',
    component: AgencyProfileComponent,
  },
];

export const agencyRoutingModule = RouterModule.forChild(routes);
