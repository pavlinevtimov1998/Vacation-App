import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';

import { LoadingService } from 'src/app/loading.service';
import { IOffer } from 'src/app/shared/interfaces';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  offer!: IOffer;

  subscription!: Subscription;

  isLoading = true;

  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService
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
          this.offer = offer;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
