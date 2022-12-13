import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IUser } from 'src/app/shared/interfaces';
import { IBooking } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profileData!: IUser;
  bookings!: IBooking[];

  pages = 1;
  currentPage = 1;
  limit = 3;

  get skip() {
    return (this.currentPage - 1) * this.limit;
  }

  isLoading = true;
  paginationLoading = false;

  subscription!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getBookings();
  }

  setCurrentPage(currentPage: number) {
    if (this.currentPage !== currentPage) {
      this.currentPage = currentPage;
      this.subscription?.unsubscribe();
      this.getBookings();
    }
  }

  getBookings(): void {
    this.paginationLoading = true;

    this.userService.getUserProfileData$(this.skip, this.limit).subscribe({
      next: ({ profileData, bookings, bookingsCount }) => {
        this.pages = Math.ceil(bookingsCount / this.limit);

        this.profileData = profileData;
        this.bookings = bookings;
        this.isLoading = false;
        this.paginationLoading = false;
      },
      error: (err) => {
        this.router.navigate(['/']);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
