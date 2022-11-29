import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
  },
];

export const userRoutingModule = RouterModule.forChild(routes);
