import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from '../user/user-login/user-login.component';
import { UserRegisterComponent } from '../user/user-register/user-register.component';
import { UserProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: 'register',
    component: UserRegisterComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
];

export const userRoutingModule = RouterModule.forChild(routes);
