import { RouterModule, Routes } from '@angular/router';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';

const routes: Routes = [
  {
    path: 'countries',
    component: CountriesCatalogComponent,
  },
];

export const themesRoutingModule = RouterModule.forChild(routes);
