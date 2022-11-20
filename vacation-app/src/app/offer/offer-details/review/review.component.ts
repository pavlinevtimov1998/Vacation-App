import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  rates = [1, 2, 3, 4, 5];

  constructor() {}

  rate = 0;

  ngOnInit(): void {}

  rateHandler(starsContainer: HTMLDivElement, index: number, rate: number) {
    for (let i = 0; i < starsContainer.children.length; i++) {
      if (i <= index) {
        starsContainer.children[i].textContent = 'star';
      } else {
        starsContainer.children[i].textContent = 'star_border';
      }
    }

    this.rate = rate;
  }

  closeReviewContainer() {}
}
