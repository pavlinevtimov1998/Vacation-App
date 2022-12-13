import { Component, Input } from '@angular/core';

import { IOffer } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-offer-images-carousel',
  templateUrl: './offer-images-carousel.component.html',
  styleUrls: ['./offer-images-carousel.component.css'],
})
export class OfferImagesCarouselComponent {
  @Input() isBooking: boolean = false;
  @Input() isCatalog: boolean = false;
  @Input() offer!: IOffer;

  selectedIndex: number = 0;

  constructor() {}

  leftArrowHandler(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.offer.images.length - 1;
    }
  }

  rightArrowHandler(): void {
    if (this.selectedIndex < this.offer.images.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }
}
