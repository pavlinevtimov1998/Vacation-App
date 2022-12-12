import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { UserAuthGuard } from './auth/guards/user-auth.guard';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { WelcomePageComponent } from './core/home/welcome-page/welcome-page.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
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
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [UserAuthGuard],
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
    path: 'details',
    loadChildren: () =>
      import('./offer-details/offer-details.module').then(
        (m) => m.OfferDetailsModule
      ),
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('./country/country.module').then((m) => m.CountryModule),
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'top',
});
