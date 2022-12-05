import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/offer/offer.service';

@Component({
  selector: 'app-booking-btn',
  templateUrl: './booking-btn.component.html',
  styleUrls: ['./booking-btn.component.css'],
})
export class BookingBtnComponent {
  @Input() offerId!: string;
  @Input() isBooked!: boolean;

  @Output() canceledBooking = new EventEmitter<void>();

  isLoading = false;

  constructor(private offerService: OfferService) {}

  cancelBooking(): void {
    this.isLoading = true;
    this.offerService.cancelBooking$(this.offerId).subscribe({
      next: () => {
        this.canceledBooking.emit();
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
