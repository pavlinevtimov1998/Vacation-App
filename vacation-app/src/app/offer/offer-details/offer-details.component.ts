import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, mergeMap, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { OfferService } from 'src/app/offer/offer.service';
import { IOffer, IAccount, IReview } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit, OnDestroy {
  offer!: IOffer;

  get isLogged$() {
    return this.authService.isLogged$;
  }

  currentUser!: IAccount | undefined;
  subscription!: Subscription;

  offerId!: string;
  agencyName!: string;

  selectedIndex = 0;
  isOpenReviewContainer = false;

  isLoading = true;

  constructor(
    private authService: AuthService,
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.activatedRoute.params,
      this.authService.currentUser$,
    ])
      .pipe(
        mergeMap(([params, account]) => {
          this.currentUser = account;
          this.offerId = params['offerId'];

          return combineLatest([
            this.offerService.getOne$(this.offerId),
            this.offerService.getOfferReviews$(this.offerId),
          ]);
        })
      )
      .subscribe({
        next: ([offer, reviews]) => {
          this.offer = offer;
          this.offer.reviews = reviews;
          this.agencyName = offer.agency.agencyName;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  openReviewWindow() {
    this.isOpenReviewContainer = true;
  }

  closeReviewContainer() {
    this.isOpenReviewContainer = false;
  }

  addedReviewHandler(review: IReview) {
    this.offer.reviews = this.offer.reviews.filter(
      (r) => r.user._id != review.user._id
    );

    this.offer.reviews.push(review);
  }

  moreOffersFromAgency() {
    return this.offer.agency.offers as IOffer[];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
