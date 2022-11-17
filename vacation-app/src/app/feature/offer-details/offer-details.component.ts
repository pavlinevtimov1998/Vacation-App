import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';
import { OfferService } from 'src/app/offer.service';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  offer!: IOffer;

  subscription!: Subscription;

  isLoading = true;
  selectedIndex = 0;

  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        mergeMap((params) => {
          const offerId = params['offerId'];

          return this.offerService.getOne$(offerId);
        })
      )
      .subscribe({
        next: (offer) => {
          console.log(offer);
          
          this.offer = offer;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
        },
      });
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
