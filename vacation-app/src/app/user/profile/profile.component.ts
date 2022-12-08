import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IUser } from 'src/app/shared/interfaces';
import { IBooking } from 'src/app/shared/interfaces/booking.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profileData!: IUser;
  bookings!: IBooking[];

  isLoading = true;

  subscription!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserProfileData$().subscribe({
      next: ({ profileData, bookings }) => {
        this.profileData = profileData;
        this.bookings = bookings;
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
