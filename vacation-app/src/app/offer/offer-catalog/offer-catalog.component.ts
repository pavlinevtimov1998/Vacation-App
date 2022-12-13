import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';

import { OfferService } from 'src/app/offer/offer.service';
import { IOffer } from 'src/app/shared/interfaces';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';

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

  searchGroup!: FormGroup;

  get searchValue() {
    return this.searchGroup.controls['search'].value as string;
  }

  get skip() {
    return (this.currentPage - 1) * this.limit;
  }

  subscription!: Subscription;

  isLoading = true;
  paginationLoading = false;

  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchGroup = new FormGroup({
      search: new FormControl(''),
    });

    this.getOffers();
  }

  setCurrentPage(currentPage: number) {
    if (this.currentPage !== currentPage) {
      this.currentPage = currentPage;
      this.subscription?.unsubscribe();
      this.getOffers();
    }
  }

  searchHandler(paginationComponent: PaginationComponent) {
    this.currentPage = 1;
    paginationComponent.currentPage = 1;

    this.router.navigate(['/offers'], {
      queryParams: { search: this.searchValue },
    });
  }

  private getOffers() {
    this.paginationLoading = true;
    this.subscription = this.activatedRoute.queryParamMap
      .pipe(
        mergeMap((query) => {
          const search = query.get('search');
          this.searchGroup.controls['search'].patchValue(search);

          return this.offerService.getOffers$(
            this.skip,
            this.limit,
            search || ''
          );
        })
      )
      .subscribe({
        next: ({ offers, offersCount }) => {
          this.pages = Math.ceil(offersCount / this.limit) || 1;

          this.offers = offers;
          this.isLoading = false;
          this.paginationLoading = false;
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
