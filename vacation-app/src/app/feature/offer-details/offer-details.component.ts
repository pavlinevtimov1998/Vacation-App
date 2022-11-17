import { Component, OnInit } from '@angular/core';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  topDestinations!: IOffer[];

  selectedIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  leftArrowHandler(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.topDestinations.length - 1;
    }
  }

  rightArrowHandler(): void {
    if (this.selectedIndex < this.topDestinations.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }
}
