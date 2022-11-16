import { Component, Input, OnInit } from '@angular/core';
import { ICountry } from 'src/app/shared/interfaces/country.interface';

@Component({
  selector: 'app-popular-countries',
  templateUrl: './popular-countries.component.html',
  styleUrls: ['./popular-countries.component.css'],
})
export class PopularCountriesComponent implements OnInit {
  @Input() topCountries!: ICountry[];

  constructor() {}

  ngOnInit(): void {}
}
