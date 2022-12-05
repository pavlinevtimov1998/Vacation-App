import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IReview } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-action-btns',
  templateUrl: './user-action-btns.component.html',
  styleUrls: ['./user-action-btns.component.css'],
})
export class UserActionBtnsComponent implements OnInit {
  @Input() offerId!: string;

  @Output() addedReview = new EventEmitter<IReview>();

  isOpenReviewContainer = false;

  constructor() {}

  ngOnInit(): void {}

  addedReviewHandler(review: IReview): void {
    this.addedReview.emit(review);
  }

  openReviewWindow(): void {
    this.isOpenReviewContainer = true;
  }

  closeReviewContainer(): void {
    this.isOpenReviewContainer = false;
  }
}
