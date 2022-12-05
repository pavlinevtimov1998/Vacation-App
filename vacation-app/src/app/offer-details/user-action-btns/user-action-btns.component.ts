import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { OfferService } from 'src/app/offer/offer.service';
import { IOffer, IReview, IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-action-btns',
  templateUrl: './user-action-btns.component.html',
  styleUrls: ['./user-action-btns.component.css'],
})
export class UserActionBtnsComponent {
  @Input() offer!: IOffer;
  @Input() currentUser!: IUser;
  @Input() isLiked!: boolean;

  @Output() addedReview = new EventEmitter<IReview>();

  isLoading = false;

  isOpenReviewContainer = false;

  constructor(private offerService: OfferService) {}

  addToFavorites() {
    this.isLoading = true;
    this.offerService.addToFavorites$(this.offer._id).subscribe({
      next: ({ message, userId }) => {
        this.offer.peopleFavourite.push(userId);

        this.isLiked = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeFromFavorites() {
    this.isLoading = true;
    this.offerService.removeFromFavorites$(this.offer._id).subscribe({
      next: ({ message, userId }) => {
        this.offer.peopleFavourite = this.offer.peopleFavourite.filter(
          (id) => id !== userId
        );

        this.isLiked = false;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
