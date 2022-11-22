import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';
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

  isLoading: boolean = true;
  dateForm!: FormGroup;

  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });

    this.getOffer();
  }

  dateFormHandler() {
    console.log(this.dateForm.value['startDate']);
  }

  private getOffer() {
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
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
