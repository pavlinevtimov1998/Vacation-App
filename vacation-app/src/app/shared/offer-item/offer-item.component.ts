import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { MessageBusService } from 'src/app/message-bus.service';
import { OfferService } from 'src/app/offer/offer.service';
import { IOffer } from 'src/app/shared/interfaces';
import { MessageType } from '../interfaces';

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
    private offerService: OfferService,
    private messageBus: MessageBusService
  ) {}

  routeHandler(event: Event) {
    if (
      (event.target as HTMLElement).tagName !== 'BUTTON' &&
      (event.target as HTMLElement).tagName !== 'MAT-ICON'
    ) {
      this.router.navigate([`/details${this.offer._id}`]);
    }
  }

  addToFavorites() {
    this.isLoading = true;
    this.offerService.addToFavourites$(this.offer._id).subscribe({
      next: ({ message, userId }) => {
        this.offer.peopleFavourite.push(userId);

        this.messageBus.addMessage({
          message: 'Successfully added to favourites!',
          type: MessageType.Success,
        });

        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(['/']);
      },
    });
  }

  removeFromFavorites() {
    this.isLoading = true;
    this.offerService.removeFromFavourites$(this.offer._id).subscribe({
      next: ({ message, userId }) => {
        this.offer.peopleFavourite = this.offer.peopleFavourite.filter(
          (id) => id !== userId
        );

        this.messageBus.addMessage({
          message: 'Successfully removed from favourites!',
          type: MessageType.Success,
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(['/']);
      },
    });
  }

  isLiked(): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user) => !!this.offer.peopleFavourite.find((id) => id == user?._id))
    );
  }
}
