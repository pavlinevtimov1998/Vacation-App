import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
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

  get startDate(): FormControl<Date | null> {
    return this.dateForm.controls['startDate'] as FormControl<Date | null>;
  }

  get endDate(): FormControl<Date | null> {
    return this.dateForm.controls['endDate'] as FormControl<Date | null>;
  }

  minDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  );
  price: number = 0;
  dateError: boolean = false;
  errorMessage = '';
  dateForm!: FormGroup;

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
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
