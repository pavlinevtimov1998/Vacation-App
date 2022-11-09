import { RouterModule, Routes } from '@angular/router';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';
import { TopAgenciesComponent } from './top-agencies/top-agencies.component';

const routes: Routes = [
  {
    path: 'countries',
    component: CountriesCatalogComponent,
  },
  {
    path: 'top-agencies',
    component: TopAgenciesComponent,
  },
];

export const themesRoutingModule = RouterModule.forChild(routes);
