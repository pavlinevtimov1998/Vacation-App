import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IOffer } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-liked-offers',
  templateUrl: './liked-offers.component.html',
  styleUrls: ['./liked-offers.component.css'],
})
export class LikedOffersComponent implements OnInit, OnDestroy {
  offers!: IOffer[];

  pages = 1;
  currentPage = 1;
  limit = 6;

  get skip() {
    return (this.currentPage - 1) * this.limit;
  }

  isLoading = true;
  paginationLoading = false;

  subscription!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getOffers();
  }

  setCurrentPage(currentPage: number) {
    if (this.currentPage !== currentPage) {
      this.currentPage = currentPage;
    }
    this.subscription?.unsubscribe();
    this.getOffers();
  }

  getOffers() {
    this.paginationLoading = true;
    this.subscription = this.userService
      .getUserFavouritesOffers$(this.skip, this.limit)
      .subscribe({
        next: ({ offers, offersCount }) => {
          this.pages = Math.ceil(offersCount / this.limit);
          this.offers = offers;

          this.isLoading = false;
          this.paginationLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
