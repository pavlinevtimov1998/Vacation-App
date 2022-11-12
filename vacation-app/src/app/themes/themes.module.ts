import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesCatalogComponent } from './countries-catalog/countries-catalog.component';
import { MaterialModule } from '../material/material.module';
import { themesRoutingModule } from './app-themes-routing.module';
import { TopAgenciesComponent } from './top-agencies/top-agencies.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [CountriesCatalogComponent, TopAgenciesComponent, CreateComponent],
  imports: [CommonModule, MaterialModule, themesRoutingModule],
})
export class ThemesModule {}
