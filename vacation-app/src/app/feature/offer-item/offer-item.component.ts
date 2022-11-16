import { Component, Input, OnInit } from '@angular/core';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css'],
})
export class OfferItemComponent implements OnInit {
  @Input() offer!: IOffer;

  constructor() {}

  ngOnInit(): void {}
}
