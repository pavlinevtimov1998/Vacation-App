import { RouterModule, Routes } from '@angular/router';

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
  },
];

export const agencyRoutingModule = RouterModule.forChild(routes);
