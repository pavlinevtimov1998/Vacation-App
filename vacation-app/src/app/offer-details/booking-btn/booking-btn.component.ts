import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { MessageBusService } from 'src/app/message-bus.service';
import { OfferService } from 'src/app/offer/offer.service';
import { IOffer, IUser } from 'src/app/shared/interfaces';
import { MessageType } from 'src/app/shared/interfaces';

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
    private messageBus: MessageBusService,
    private router: Router
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
      error: (err) => {
        this.router.navigate(['/']);
      },
    });
  }
}
