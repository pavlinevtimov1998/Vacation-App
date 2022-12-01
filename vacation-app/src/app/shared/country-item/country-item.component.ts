import { Component, Input } from '@angular/core';

import { ICountry } from '../interfaces/country.interface';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.css'],
})
export class CountryItemComponent {
  @Input() country!: ICountry;

  constructor() {}
}
