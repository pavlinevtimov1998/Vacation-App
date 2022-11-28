import { Component, Input } from '@angular/core';

import { IReview } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-offer-reviews',
  templateUrl: './offer-reviews.component.html',
  styleUrls: ['./offer-reviews.component.css'],
})
export class OfferReviewsComponent {
  @Input() reviews!: IReview[];

  readonly rates = [1, 2, 3, 4, 5];

  constructor() {}
}
