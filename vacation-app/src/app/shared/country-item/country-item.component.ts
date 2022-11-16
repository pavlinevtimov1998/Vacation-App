import { Component, Input, OnInit } from '@angular/core';
import { ICountry } from '../interfaces/country.interface';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.css'],
})
export class CountryItemComponent implements OnInit {
  @Input() country!: ICountry;

  constructor() {}

  ngOnInit(): void {}
}
