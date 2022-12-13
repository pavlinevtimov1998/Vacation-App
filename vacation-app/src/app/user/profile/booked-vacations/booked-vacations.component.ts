import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from 'src/app/shared/interfaces';
import { IBooking } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-booked-vacations',
  templateUrl: './booked-vacations.component.html',
  styleUrls: ['./booked-vacations.component.css'],
})
export class BookedVacationsComponent {
  @Input() profileData!: IUser;
  @Input() bookings!: IBooking[];

  constructor(private router: Router){}

  goToOffer(offerId: string) {    
    this.router.navigate(['/details', offerId])
  }
}
