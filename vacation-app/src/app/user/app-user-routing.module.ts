import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

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
  {
    path: 'edit-profile',
    component: EditProfileComponent,
  },
];

export const userRoutingModule = RouterModule.forChild(routes);
