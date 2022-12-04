import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { OfferService } from 'src/app/offer/offer.service';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';
import { IUser } from '../interfaces';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css'],
})
export class OfferItemComponent {
  @Input() offer!: IOffer;

  get currentUser$() {
    return this.authService.currentUser$;
  }

  get isLogged$() {
    return this.authService.isLogged$;
  }

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private offerService: OfferService
  ) {}

  routeHandler(event: Event) {
    if (
      (event.target as HTMLElement).tagName !== 'BUTTON' &&
      (event.target as HTMLElement).tagName !== 'MAT-ICON'
    ) {
      this.router.navigate([`/offers/${this.offer._id}`]);
    }
  }

  addToFavourites() {
    this.isLoading = true;
    this.offerService.addToFavourites$(this.offer._id).subscribe({
      next: ({ message, userId }) => {
        this.offer.peopleFavourite.push(userId);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //TODO
  removeFromFavourites() {
    this.isLoading = true;
    this.offerService.removeFromFavourites$(this.offer._id).subscribe({
      next: ({ message, userId }) => {
        this.offer.peopleFavourite = this.offer.peopleFavourite.filter(
          (id) => id !== userId
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  canLike() {
    return combineLatest([this.currentUser$, this.isLogged$]).pipe(
      map(
        ([user, isLogged]) =>
          isLogged &&
          !user?.isAgency &&
          !this.offer.peopleFavourite.find((id) => id == user?._id)
      )
    );
  }
}
