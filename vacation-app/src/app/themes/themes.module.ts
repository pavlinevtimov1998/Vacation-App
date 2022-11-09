import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';
import { MaterialModule } from '../material/material.module';
import { themesRoutingModule } from './app-themes-routing.module';
import { TopAgenciesComponent } from './top-agencies/top-agencies.component';

@NgModule({
  declarations: [CountriesCatalogComponent, TopAgenciesComponent],
  imports: [CommonModule, MaterialModule, themesRoutingModule],
  exports: [CountriesCatalogComponent],
})
export class ThemesModule {}
