import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './core/home/welcome-page/welcome-page.component';
import { TopAgenciesComponent } from './core/top-agencies/top-agencies.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomePageComponent,
  },
  {
    path: 'top-agencies',
    component: TopAgenciesComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'agency',
    loadChildren: () =>
      import('./agency/agency.module').then((m) => m.AgencyModule),
  },
  {
    path: 'offers',
    loadChildren: () =>
      import('./offer/offer.module').then((m) => m.OfferModule),
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('./country/country.module').then((m) => m.CountryModule),
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);

// , {
//   scrollPositionRestoration: 'enabled',
// }
