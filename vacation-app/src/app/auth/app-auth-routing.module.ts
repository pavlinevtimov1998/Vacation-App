import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-page/login/login.component';
import { RegisterComponent } from './register-page/register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

export const authRoutingModule = RouterModule.forChild(routes);
