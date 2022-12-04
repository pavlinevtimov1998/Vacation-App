import { RouterModule, Routes } from '@angular/router';

import { LikedOffersComponent } from './liked-offers/liked-offers.component';
import { UserProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'favourites',
    component: LikedOffersComponent,
  },
];

export const userRoutingModule = RouterModule.forChild(routes);
