import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, mergeMap, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { OfferService } from 'src/app/offer/offer.service';
import { IOffer, IAccount, IComment, IUser } from 'src/app/shared/interfaces';

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
  isBooked!: boolean;
  isLiked!: boolean;

  selectedIndex = 0;

  isLoading = true;

  constructor(
    private authService: AuthService,
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
            this.offerService.getOfferComments$(this.offerId),
          ]);
        })
      )
      .subscribe({
        next: ([offer, comments]) => {
          this.offer = offer;
          this.offer.comments = comments;
          this.agencyName = offer.agency.agencyName;
          this.isBooked = !!offer.peopleBooked.find(
            (id) => id == this.currentUser?._id
          );
          this.isLiked = !!this.offer.peopleFavourite.find(
            (id) => id == this.currentUser?._id
          );

          this.isLoading = false;
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }

  addedCommentHandler(comment: IComment): void {
    if (!comment.user?.username) {
      comment.user = this.currentUser as IUser;
    }

    this.offer.comments = this.offer.comments.filter(
      (r) => r.user._id != comment.user._id
    );

    this.offer.comments.push(comment);
  }

  moreOffersFromAgency(): IOffer[] {
    return this.offer.agency.offers as IOffer[];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
