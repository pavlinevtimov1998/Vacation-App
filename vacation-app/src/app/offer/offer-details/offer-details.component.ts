import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, mergeMap, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { OfferService } from 'src/app/offer/offer.service';
import { IOffer, IAccount } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit, OnDestroy {
  offer!: IOffer;

  currentUser!: IAccount;
  isLogged$ = this.authService.islogged$;
  subscription!: Subscription;

  isReviewOpen = false;
  isLoading = true;
  selectedIndex = 0;

  constructor(
    private authService: AuthService,
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.activatedRoute.params,
      this.authService.currentUser$,
    ])
      .pipe(
        mergeMap(([params, account]) => {
          this.currentUser = account;
          const offerId = params['offerId'];

          return combineLatest([
            this.offerService.getOne$(offerId),
            this.offerService.getOfferReviews$(offerId),
          ]);
        })
      )
      .subscribe({
        next: ([offer, reviews]) => {
          this.offer = offer;
          this.offer.reviews = reviews;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  toggleReviewHandler() {
    this.isReviewOpen = !this.isReviewOpen;
  }

  similarOffers() {
    return this.offer.agency.offers as IOffer[];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
