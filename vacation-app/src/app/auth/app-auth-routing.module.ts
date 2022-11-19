import { RouterModule, Routes } from '@angular/router';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  {
    path: 'agency/login',
    component: AgencyLoginComponent,
  },
  {
    path: 'agency/register',
    component: AgencyRegisterComponent,
  },
  {
    path: 'user/login',
    component: UserLoginComponent,
  },
  {
    path: 'user/register',
    component: UserRegisterComponent,
  },
  {
    path: 'profile/:profileId',
    component: ProfileComponent,
  },
];

export const authRoutingModule = RouterModule.forChild(routes);
