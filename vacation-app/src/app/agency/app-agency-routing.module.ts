import { RouterModule, Routes } from '@angular/router';

import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';

const routes: Routes = [
  {
    path: 'login',
    component: AgencyLoginComponent,
  },
  {
    path: 'register',
    component: AgencyRegisterComponent,
  },
];

export const agencyRoutingModule = RouterModule.forChild(routes);
