import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './core/welcome-page/welcome-page.component';

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
      import('./themes/themes.module').then((m) => m.ThemesModule),
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled',
});
