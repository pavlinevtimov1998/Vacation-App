import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-btn',
  templateUrl: './booking-btn.component.html',
  styleUrls: ['./booking-btn.component.css'],
})
export class BookingBtnComponent implements OnInit {
  @Input() offerId!: string;
  @Input() isBooked!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
