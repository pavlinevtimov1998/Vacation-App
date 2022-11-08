import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';
import { MaterialModule } from '../material/material.module';
import { themesRoutingModule } from './app-themes-routing.module';

@NgModule({
  declarations: [CountriesCatalogComponent],
  imports: [CommonModule, MaterialModule, themesRoutingModule],
  exports: [CountriesCatalogComponent],
})
export class ThemesModule {}
