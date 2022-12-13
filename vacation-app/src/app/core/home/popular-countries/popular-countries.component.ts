import { Component, Input } from '@angular/core';

import { ICountry } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-popular-countries',
  templateUrl: './popular-countries.component.html',
  styleUrls: ['./popular-countries.component.css'],
})
export class PopularCountriesComponent {
  @Input() topCountries!: ICountry[];

  constructor() {}
}
