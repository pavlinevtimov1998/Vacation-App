import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MessageBusService } from 'src/app/message-bus.service';
import { OfferService } from 'src/app/offer/offer.service';
import { IOffer, IUser } from 'src/app/shared/interfaces';
import { MessageType } from 'src/app/shared/interfaces/message.interface';

@Component({
  selector: 'app-booking-btn',
  templateUrl: './booking-btn.component.html',
  styleUrls: ['./booking-btn.component.css'],
})
export class BookingBtnComponent {
  @Input() offer!: IOffer;
  @Input() currentUser!: IUser;
  @Input() isBooked!: boolean;

  @Output() canceledBooking = new EventEmitter<void>();

  isLoading = false;

  constructor(
    private offerService: OfferService,
    private messageBus: MessageBusService
  ) {}

  cancelBooking(): void {
    this.isLoading = true;
    this.offerService.cancelBooking$(this.offer._id).subscribe({
      next: () => {
        this.offer.peopleBooked = this.offer.peopleBooked.filter(
          (id) => id !== this.currentUser?._id
        );

        this.messageBus.addMessage({
          message: 'Successful canceled booking!',
          type: MessageType.Success,
        });

        this.isBooked = false;
        this.isLoading = false;
      },
    });
  }
}
