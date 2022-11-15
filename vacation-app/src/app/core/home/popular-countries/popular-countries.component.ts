import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-countries',
  templateUrl: './popular-countries.component.html',
  styleUrls: ['./popular-countries.component.css'],
})
export class PopularCountriesComponent implements OnInit {
  @Input() topCountries!: {
    country: string;
    id: string;
    imageUrl: string;
  }[];

  constructor() {}

  ngOnInit(): void {}
}
