import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferService } from 'src/app/offer/offer.service';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';

@Component({
  selector: 'app-offer-catalog',
  templateUrl: './offer-catalog.component.html',
  styleUrls: ['./offer-catalog.component.css'],
})
export class OfferCatalogComponent implements OnInit, OnDestroy {
  offers!: IOffer[];

  subscribtion!: Subscription;

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.subscribtion = this.offerService.getOffers$().subscribe({
      next: (offers) => {
        this.offers = offers;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }
}
