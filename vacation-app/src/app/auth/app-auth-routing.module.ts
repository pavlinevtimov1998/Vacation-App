import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from '../auth/user-login/user-login.component';
import { UserRegisterComponent } from '../auth/user-register/user-register.component';
import { AccountChoicesComponent } from './account-choices/account-choices.component';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AccountChoicesComponent,
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
    path: 'agency/login',
    component: AgencyLoginComponent,
  },
  {
    path: 'agency/register',
    component: AgencyRegisterComponent,
  },
];

export const authRoutingModule = RouterModule.forChild(routes);
