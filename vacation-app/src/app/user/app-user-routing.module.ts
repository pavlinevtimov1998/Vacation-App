import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

import { UserProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
];

export const userRoutingModule = RouterModule.forChild(routes);
