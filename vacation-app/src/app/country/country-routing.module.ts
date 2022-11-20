import { RouterModule, Routes } from '@angular/router';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CountriesCatalogComponent,
  },
];

export const CountryRoutingModule = RouterModule.forChild(routes);
