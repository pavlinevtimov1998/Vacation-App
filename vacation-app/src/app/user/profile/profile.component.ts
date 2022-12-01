import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/loading.service';
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

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  subscription!: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfileData$().subscribe({
      next: ({ profileData, bookings }) => {
        this.profileData = profileData;
        this.bookings = bookings;
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/']);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
