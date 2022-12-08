import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageBusService } from 'src/app/message-bus.service';

import { OfferService } from 'src/app/offer/offer.service';
import { IOffer, IReview, IUser } from 'src/app/shared/interfaces';
import { MessageType } from 'src/app/shared/interfaces/message.interface';

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

  constructor(
    private offerService: OfferService,
    private messageBus: MessageBusService
  ) {}

  addToFavourites() {
    this.isLoading = true;
    this.offerService.addToFavourites$(this.offer._id).subscribe({
      next: ({ message, userId }) => {
        this.offer.peopleFavourite.push(userId);

        this.messageBus.addMessage({
          message: 'Successfully added to favourites!',
          type: MessageType.Success,
        });

        this.isLiked = true;
        this.isLoading = false;
      }
    });
  }

  removeFromFavourites() {
    this.isLoading = true;
    this.offerService.removeFromFavourites$(this.offer._id).subscribe({
      next: ({ message, userId }) => {
        this.offer.peopleFavourite = this.offer.peopleFavourite.filter(
          (id) => id !== userId
        );

        this.messageBus.addMessage({
          message: 'Successfully removed from favourites!',
          type: MessageType.Success,
        });

        this.isLiked = false;
        this.isLoading = false;
      }
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
