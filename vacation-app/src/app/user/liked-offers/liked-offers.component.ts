import { Component, OnInit } from '@angular/core';

import { IOffer } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-liked-offers',
  templateUrl: './liked-offers.component.html',
  styleUrls: ['./liked-offers.component.css'],
})
export class LikedOffersComponent implements OnInit {
  offers!: IOffer[];

  isLoading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserFavouritesOffers$().subscribe({
      next: (offers) => {
        this.offers = offers;

        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
