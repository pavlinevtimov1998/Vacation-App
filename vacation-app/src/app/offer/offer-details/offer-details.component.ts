import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, mergeMap, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OfferService } from 'src/app/offer/offer.service';
import { IAccount } from 'src/app/shared/interfaces/account.interface';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  offer!: IOffer;

  currentUser!: IAccount;
  isLogged$ = this.authService.islogged$;
  subscription!: Subscription;

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

          return this.offerService.getOne$(offerId);
        })
      )
      .subscribe({
        next: (offer) => {
          this.offer = offer;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  similarOffers() {
    return this.offer.country.offers as IOffer[];
  }

  leftArrowHandler(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.offer.images.length - 1;
    }
  }

  rightArrowHandler(): void {
    if (this.selectedIndex < this.offer.images.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }
}
