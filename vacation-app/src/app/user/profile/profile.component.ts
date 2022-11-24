import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from 'src/app/shared/interfaces';
import { IBooking } from 'src/app/shared/interfaces/booking.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profileData!: IUser;
  bookings!: IBooking[];

  isLoading: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserProfileData$().subscribe({
      next: ({ profileData, bookings }) => {
        this.profileData = profileData;
        this.bookings = bookings;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/']);
      },
    });
  }
}
