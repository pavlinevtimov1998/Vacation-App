import { RouterModule, Routes } from '@angular/router';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';
import { CreateComponent } from './create/create.component';
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
  {
    path: 'create',
    component: CreateComponent,
  },
];

export const featureRoutingModule = RouterModule.forChild(routes);
