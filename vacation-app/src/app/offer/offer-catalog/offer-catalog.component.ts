import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/loading.service';
import { OfferService } from 'src/app/offer/offer.service';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';

@Component({
  selector: 'app-offer-catalog',
  templateUrl: './offer-catalog.component.html',
  styleUrls: ['./offer-catalog.component.css'],
})
export class OfferCatalogComponent implements OnInit, OnDestroy {
  offers!: IOffer[];

  pages = 1;
  currentPage = 1;
  limit = 6;

  get skip() {
    return (this.currentPage - 1) * this.limit;
  }

  subscribtion = new Subscription();

  isLoading = true;
  paginationLoading = false;

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.getOffers();
  }

  setCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
    this.getOffers();
  }

  private getOffers() {
    this.paginationLoading = true;

    this.subscribtion.add(
      this.offerService.getOffers$(this.skip, this.limit).subscribe({
        next: ({ offers, offersCount }) => {
          this.pages = Math.ceil(offersCount / this.limit);

          this.offers = offers;
          this.isLoading = false;
          this.paginationLoading = false;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }
}
