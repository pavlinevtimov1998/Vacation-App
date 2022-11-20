import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './core/home/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomePageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
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

export const AppRoutingModule = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled',
});
